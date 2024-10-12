import { environment } from 'environments/environment';
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from 'app/model/auth-token';
import { firstValueFrom } from 'rxjs';
import { User } from 'app/model/user';
import { Store } from '@ngrx/store';
import { updateIsLogged, updateName } from 'app/store/user.actions';
import { AddressResponse } from 'app/model/address';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<any>,
  ) {}
  private TOKEN_KEY = 'authtoken';
  private SESSION_KEY = 'sessionid';

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

  logout() {
    let sessionId = localStorage.getItem(this.SESSION_KEY);
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
    let token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      try {
        this.authToken.set(token);

        let addresses = await this.loadUserAddress();
        this.updateAddress(addresses);

        let user = await this.loadUserInfo();
        this.updateUser(user);

        return user;
      } catch (error) {
        this.authToken.set(null);
        this.updateUser(null);
      }
    }
    return null;
  }
  async loadUserInfo(): Promise<User> {
    const result: any = await firstValueFrom(
      this.httpClient.post<any>(`${environment.apiUrl}/WhoAmI`, ''),
    );

    return result;
  }

  async loadUserAddress(): Promise<AddressResponse> {
    let filters = {
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
    const result: any = await firstValueFrom(
      this.httpClient.post<AddressResponse>(
        `${environment.apiUrl}/Address/ListAddress`,
        filters,
      ),
    );

    return result;
  }

  private updateAddress(addresses: AddressResponse | null) {
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
        updateName({ fullName: user.firstNameUser + ' ' + user.lastNameUser }),
      );
      this.store.dispatch(updateIsLogged({ isLogged: true }));
    } else {
      this.isAuthenticated.set(false);
      this.customerId.set(null);
      this.store.dispatch(updateName({ fullName: null }));
      this.store.dispatch(updateIsLogged({ isLogged: false }));
    }
  }

  async closeMultipleSessions(idSessionTemp: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post<string>(
        `${environment.authApiUrl}/api/Session/CloseOtherSession?idSession=${idSessionTemp}`,
        '',
      ),
    );
  }

  async activateUser(token: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.post<string>(
        `${environment.apiUrl}/UserRegistration/validateUser?token=${token}`,
        '',
      ),
    );
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
    localStorage.setItem(this.TOKEN_KEY, token.access_token);
    localStorage.setItem(this.SESSION_KEY, token.idSession);
    return token;
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
  ): Promise<any> {
    let body = {
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
    const token: any = await firstValueFrom(
      this.httpClient.post<any>(`${environment.apiUrl}/UserRegistration`, body),
    );
    return token;
  }

  async resetPassword(newPassword: string): Promise<void> {
    await this.login('testing', newPassword);
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    new Promise((resolve, reject) => {
      resolve('');
    }).then(() => {
      console.log('Forgot password email sent to:', email);
    });
  }
}
