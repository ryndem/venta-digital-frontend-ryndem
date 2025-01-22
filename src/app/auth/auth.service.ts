import { environment } from 'environments/environment';
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthToken } from 'app/model/auth-token';
import { firstValueFrom } from 'rxjs';
import { User } from 'app/model/user';
import { Store } from '@ngrx/store';
import { updateAddresses, updateIsLogged, updateIsLoginModalOpened, updateIsSignUpRequested, updateIsSignUpReviewPending, updateIsSignUpServerError, updateLoading, updateSelectedOrderItems, updateSignUpErrorMessage, updateUser } from 'app/store/actions/user.actions';
import { AddressResponse } from 'app/model/address-response';
import { showErrorNotification, updateIsPasswordResetted, updateIsResetPasswordChangeSuccess, updateIsResetPasswordRestError, updateIsResetPasswordTokenExpired, updateIsResetPasswordTokenValid } from 'app/store/actions/view.actions';

/**
 * Service to manage user authentication
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * Key to store authentication token
   * @private
   */
  private TOKEN_KEY = 'authtoken';
  
  /**
   * Key to store session id
   * @private
   */
  private SESSION_KEY = 'sessionid';
  
  /**
   * Key to store refresh token
   * @private
   */
  private REFRESH_TOKEN_KEY = 'refresh_token';
  
  /**
   * Key to store purchase order form
   * @private
   */
  private ORDER_FORM = 'purchase-order-form';
  
  /**
   * Boolean to track if the user is authenticated
   */
  isAuthenticated = signal<boolean>(false);
  
  /**
   * Authentication token
   */
  authToken = signal<string | null>(null);
  
  /**
   * User currently aunthenticated
   */
  currentUser = signal<User | null>(null);
  
  /**
   * User first address id
   */
  addressId = signal<string | null>(null);
  
  /**
   * User customer id
   */
  customerId = signal<string | null>(null);

  /**
   * Creates an instance of AuthService.
   * @param {HttpClient} httpClient
   * @param {Store} store
   */
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  /**
   * Close login modal
   */
  closeLoginModal() {
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: false }));
  }

  /**
   * Open login modal
   */
  openLoginModal() {
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
  }

  /**
   * Method to handle login action
   *
   * @param {string} username
   * @param {string} password
   * @return {Promise<AuthToken>}
   */
  async login(username: string, password: string): Promise<AuthToken> {
    const form: URLSearchParams = this.getLoginForm(username, password);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded',
      ),
    };

    const token: AuthToken = await firstValueFrom(
      this.httpClient.post<AuthToken>(
        `${environment.authApiUrl}/connect/token`,
        form.toString(),
        options,
      ),
    );

    this.authToken.set(token.access_token);
    localStorage.removeItem(this.ORDER_FORM);
    this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: false}));
    localStorage.setItem(this.TOKEN_KEY, token.access_token);
    localStorage.setItem(this.SESSION_KEY, token.idSession);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refresh_token);
    return token;
  }

  /**
   * Method to refresh authentication token
   * @return {(Promise<AuthToken | null>)}
   */
  async refreshToken(): Promise<AuthToken | null> {
    const refresh_token = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refresh_token) return null;

    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('client_id', 'ro.client');
    body.append('refresh_token', refresh_token);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    try {
      const token: AuthToken = await firstValueFrom(
        this.httpClient.post<AuthToken>(
          `${environment.authApiUrl}/connect/token`,
          body.toString(),
          options
        )
      );

      this.authToken.set(token.access_token);
      localStorage.setItem(this.TOKEN_KEY, token.access_token);
      localStorage.setItem(this.SESSION_KEY, token.idSession);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token.refresh_token);
      return token;
    } catch (error) {
      console.error('Failed to refresh token', error);
      return null;
    }
  }

  /**
   * Method to close session
   */
  async logout() {
    const sessionId = localStorage.getItem(this.SESSION_KEY);
    firstValueFrom(
      this.httpClient.post<string>(
        `${environment.authApiUrl}/api/Session/CloseSession?idSession=${sessionId}`,
        '',
      ),
    );

    this.authToken.set(null);
    this.updateUser(null);
    localStorage.clear();
  }

  /**
   * Load user session 
   * @return {(Promise<User | null>)}
   */
  async loadSession(): Promise<User | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.store.dispatch(updateLoading({ isLoading: true }));
    if (token) {
      try {
        this.authToken.set(token);

        const addresses = await this.loadUserAddress();
        this.updateAddress(addresses);

        const user = await this.loadUserInfo();
        this.updateUser(user);

        this.updateUserSelections();
        
        this.store.dispatch(updateLoading({ isLoading: false }))
        return user;
      } catch (error) {
        this.authToken.set(null);
        this.updateUser(null);
      } 
    }
    this.store.dispatch(updateLoading({ isLoading: false }));
    return null;
  }

  /**
   * Load user information
   * @return {Promise<User>}
   */
  async loadUserInfo(): Promise<User> {
    const result = await firstValueFrom(
      this.httpClient.post<User>(`${environment.apiUrl}/WhoAmI`, ''),
    );

    return result;
  }

  /**
   * Method to load current user address
   * @return {Promise<AddressResponse>}
   */
  async loadUserAddress(): Promise<AddressResponse> {
    const filters = {
      Filters: [
        {
          FilterName: 'Activo',
          FilterValue: true,
        },
        {
          FilterName: 'ClaveTipoDireccion',
          FilterValue: 'entrega',
        },
      ],
    };
    const result = await firstValueFrom(
      this.httpClient.post<AddressResponse>(
        `${environment.apiUrl}/Address/ListAddress`,
        filters,
      ),
    );

    return result;
  }

  /**
   * Method to update user addresses
   * @private
   * @param {(AddressResponse | null)} addresses
   */
  private updateAddress(addresses: AddressResponse | null) {
    if(addresses && addresses.results) {
      this.store.dispatch(
        updateAddresses({ addresses: addresses.results}),
      );
    }

    if (addresses && addresses?.results?.length > 0) {
      this.addressId.set(addresses.results[0].idAddress);
    } else {
      this.addressId.set(null);
    }
  }

  /**
   * Method to update user
   * @private
   * @param {(User | null)} user
   */
  private updateUser(user: User | null) {
    if (user) {
      this.isAuthenticated.set(true);
      this.customerId.set(user.idCustomer);
      this.store.dispatch(
        updateUser({ user: user }),
      );
      this.store.dispatch(updateIsLogged({ isLogged: true }));
    } else {
      this.isAuthenticated.set(false);
      this.customerId.set(null);
      this.store.dispatch(updateUser({ user: null }));
      this.store.dispatch(updateIsLogged({ isLogged: false }));
    }
  }

  /**
   * Method to update order form
   * @private
   */
  private updateUserSelections() {
    if( localStorage.getItem(this.ORDER_FORM)) {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: true}));
    }
  }

  /**
   * Temporal session id
   * @param {string} idSessionTemp
   * @return {Promise<void>}
   */
  async closeMultipleSessions(idSessionTemp: string): Promise<void> {
    try {
    await firstValueFrom(
      this.httpClient.post<string>(
        `${environment.authApiUrl}/api/Session/CloseOtherSession?idSession=${idSessionTemp}`,
        '',
      ),
    );
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Method to activate user 
   * @param {string} token
   * @return {Promise<void>}
   */
  async activateUser(token: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post<string>(
        `${environment.apiUrl}/UserRegistration/validateUser?token=${token}`,
        '',
      ),
    );
  }

  /**
   * Initialize login form
   * @private
   * @param {string} username
   * @param {string} password
   * @return  {URLSearchParams}
   */
  private getLoginForm(username: string, password: string): URLSearchParams {
    const form = new URLSearchParams();
    form.set('username', username);
    form.set('password', password);
    form.set('grant_type', 'password');
    form.set('client_id', 'ro.client');
    form.set('scope', 'openid profile roles offline_access default');

    return form;
  }

  /**
   * Method to send sign up request
   * @param {string} email
   * @param {string} customerName
   * @param {string} taxId
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} phone
   * @param {string} position
   * @param {string} password
   * @param {boolean} isFinalUser
   * @param {boolean} isReseller
   */
  async signUp(
    email: string,
    customerName: string,
    taxId: string,
    firstName: string,
    lastName: string,
    phone: string,
    position: string,
    password: string,
    isFinalUser: boolean,
    isReseller: boolean,
  ) {
    const body = {
      email,
      customerName,
      taxId,
      firstName,
      lastName,
      phone,
      position,
      password,
      isFinalUser,
      isReseller,
    };
    console.log('ERROR ', body);
    if(!email) {
      return;
    }
    try {
      const result = await firstValueFrom(this.httpClient.post<Promise<{ email: string, status: string }>>(`${environment.apiUrl}/UserRegistration`, body));

      this.store.dispatch(updateIsSignUpRequested({isSignUpRequested: true}));
      if (result.status === 'pending') {
        this.store.dispatch(updateIsSignUpReviewPending({isSignUpReviewPending: true}));
      }
    } catch (e: unknown) {
      if (e instanceof HttpErrorResponse) {
        if (e.error?.type === 'code_not_found_customer') {
          this.store.dispatch(updateIsSignUpRequested({isSignUpRequested: true}));
          this.store.dispatch(updateIsSignUpReviewPending({isSignUpReviewPending: true}));
        } else if (e.error?.type === 'code_password_requirement') {
          this.store.dispatch(updateIsSignUpServerError({isSignUpServerError: true}));
          this.store.dispatch(updateSignUpErrorMessage({signUpErrorMessage: 'Lo sentimos, tu contraseña no cumple con los requisitos mínimos de seguridad. Intenta una nueva.'}));
        } else {
          this.store.dispatch(updateIsSignUpServerError({isSignUpServerError: true}));
          this.store.dispatch(updateSignUpErrorMessage({signUpErrorMessage: 'Lo sentimos, parece que ha ocurrido un problema al enviar tu formulario. Por favor, inténtalo nuevamente.'}));
        }
      }
    }
  }

  /**
   * Send forgot password request
   * @param {string} email
   */
  async sendForgotPasswordEmail(email: string) {
    console.log('EMAIL - ', email);
    try {
      await firstValueFrom(this.httpClient.post(`${environment.apiUrl}/ForgotPassword`, { email }));
      this.store.dispatch(updateIsPasswordResetted({ isPasswordResetted: true }))
      console.log('111 ');
    } catch (error: unknown) { 
      if (error instanceof HttpErrorResponse) {
        if (error.status === 410) {
          console.log('222 ');
          this.store.dispatch(updateIsPasswordResetted({ isPasswordResetted: true }))
        }
      } else {
        console.log('333 ');
        console.error('An unexpected error occurred');
      }
    }

  }

  /**
   * Validates reset password token
   * @param {string} token
   */
  async validateRequestResetPassword(token: string) {
    try {
      await firstValueFrom(
        this.httpClient.post(`${environment.apiUrl}/validateRequestResetPassword`, { requestResetToken: token })
      )
      this.store.dispatch(updateIsResetPasswordTokenValid({isResetPasswordTokenValid: true}));
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.error?.type === "code_requestResetToken_expired" ) {
          this.store.dispatch(updateIsResetPasswordTokenExpired({isResetPasswordTokenExpired: true}));
        } else {
          this.store.dispatch(updateIsResetPasswordRestError({isResetPasswordRestError: true}));
        }
      }
    }
  }

  /**
   * Method to update password
   * @param {string} token
   * @param {string} newPassword
   * @return {Promise<void>}
   */
  async resetPassword(token: string, newPassword: string) {

    try {
      await firstValueFrom(
        this.httpClient.post(`${environment.apiUrl}/resetPassword`, { token, password: newPassword })
      )
      this.store.dispatch(updateIsResetPasswordRestError({ isResetPasswordRestError: false}))
      this.store.dispatch(updateIsResetPasswordChangeSuccess({isResetPasswordChangeSuccess: true}));
    } catch (error) {
      if( error instanceof HttpErrorResponse ) {
        if( error.error?.type === 'code_password_is_current') {
          console.log('ERROR !!!! ' + error.error?.detail);
          this.store.dispatch(showErrorNotification({message: error.error?.detail}))
        } else {
          this.store.dispatch(updateIsResetPasswordRestError({ isResetPasswordRestError: true}))
        }
      } else {
        this.store.dispatch(updateIsResetPasswordRestError({ isResetPasswordRestError: true}))
      }
      
    }




    
  }

}

