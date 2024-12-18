import { environment } from 'environments/environment';
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from 'app/model/auth-token';
import { firstValueFrom } from 'rxjs';
import { User } from 'app/model/user';
import { Store } from '@ngrx/store';
import { updateAddresses, updateIsLogged, updateLoading, updateSelectedOrderItems, updateUser } from 'app/store/users/user.actions';
import { AddressResponse } from 'app/model/address-response';
import { UserState } from 'app/store/users/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ user: UserState }>,
  ) { }
  private TOKEN_KEY = 'authtoken';
  private SESSION_KEY = 'sessionid';
  private REFRESH_TOKEN_KEY = 'refresh_token';
  private ORDER_FORM = 'purchase-order-form';

  isOpenLoginModal = signal<boolean>(false);
  isAuthenticated = signal<boolean>(false);
  authToken = signal<string | null>(null);
  currentUser = signal<User | null>(null);
  addressId = signal<string | null>(null);
  customerId = signal<string | null>(null);

  closeLoginModal() {
    this.isOpenLoginModal.set(false);
  }

  openLoginModal() {
    this.isOpenLoginModal.set(true);
  }

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

  logout() {
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

  async loadSession(): Promise<User | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.store.dispatch(updateLoading({ loading: true }));
    if (token) {
      try {
        this.authToken.set(token);

        const addresses = await this.loadUserAddress();
        this.updateAddress(addresses);

        const user = await this.loadUserInfo();
        this.updateUser(user);

        this.updateUserSelections();

        return user;
      } catch (error) {
        this.authToken.set(null);
        this.updateUser(null);
      } finally {
        this.store.dispatch(updateLoading({ loading: false }))
      }
    }
    this.store.dispatch(updateLoading({ loading: false }));
    return null;
  }

  async loadUserInfo(): Promise<User> {
    const result = await firstValueFrom(
      this.httpClient.post<User>(`${environment.apiUrl}/WhoAmI`, ''),
    );

    return result;
  }

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

  private updateUserSelections() {
    if( localStorage.getItem(this.ORDER_FORM)) {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: true}));
    }
  }

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

  async activateUser(token: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post<string>(
        `${environment.apiUrl}/UserRegistration/validateUser?token=${token}`,
        '',
      ),
    );
  }

  private getLoginForm(username: string, password: string): URLSearchParams {
    const form = new URLSearchParams();
    form.set('username', username);
    form.set('password', password);
    form.set('grant_type', 'password');
    form.set('client_id', 'ro.client');
    form.set('scope', 'openid profile roles offline_access default');

    return form;
  }

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
  ): Promise<{ email: string, status: string }> {
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
    const result = await firstValueFrom(
      this.httpClient.post<Promise<{ email: string, status: string }>>(`${environment.apiUrl}/UserRegistration`, body),
    );
    return result;
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post(`${environment.apiUrl}/ForgotPassword`, { email })
    )
  }

  async validateRequestResetPassword(token: string) {
    await firstValueFrom(
      this.httpClient.post(
        `${environment.apiUrl}/validateRequestResetPassword`,
        { requestResetToken: token }
      )
    )
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post(
        `${environment.apiUrl}/resetPassword`,
        { token, password: newPassword }
      )
    )
  }

}
