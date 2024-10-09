import { environment } from 'environments/environment';
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from 'app/model/auth-token';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private TOKEN_KEY = 'authtoken';

  isOpenLoginModal = signal<boolean>(false);

  isAuthenticated = signal<boolean>(false);

  authToken = signal<string|null>(null);

  closeLoginModal() {
    this.isOpenLoginModal.set(false);
  }

  openLoginModal() {
    this.isOpenLoginModal.set(true);
  }

  logout() {
    this.authToken.set(null);
    localStorage.clear();
  }
  async loadSession() {
    let token = localStorage.getItem(this.TOKEN_KEY);
    console.log('token stored', token)
    if(token) {
      
      this.authToken.set(token);
      return await this.loadUserInfo();
    }
  }
  async loadUserInfo() {
    const result: any = await firstValueFrom(
      this.httpClient.post<any>(`${environment.apiUrl}/WhoAmI`, '')
    );
    console.log('INFO', result);
  }

  async closeMultipleSessions(idSessionTemp: string): Promise<void> {

    const result: string = await firstValueFrom(
      this.httpClient.post<string>(`${environment.authApiUrl}/api/Session/CloseOtherSession?idSession=${idSessionTemp}`, '')
    );

  }

  async login(username: string, password: string): Promise<AuthToken> {
    const form: URLSearchParams = this.getLoginForm(username, password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const token: AuthToken = await firstValueFrom(
      this.httpClient.post<AuthToken>(`${environment.authApiUrl}/connect/token`, form.toString(), options)
    );

    this.authToken.set(token.access_token);
    localStorage.setItem(this.TOKEN_KEY, token.access_token);
    return token;
  }

  private getLoginForm(username: string, password: string): URLSearchParams {
    const form = new URLSearchParams();
    form.set('username', username);
    form.set('password', password);
    form.set('grant_type', 'password');
    form.set('client_id', 'ro.client');
    form.set('scope', 'openid profile roles');

    return form;
  }

  async signUp(
    email: string,
    company: string,
    rfc: string,
    name: string,
    lastName: string,
    phoneNumber: string,
    jobTitle: string,
    password: string
  ): Promise<void> {

    await this.login(email, password);

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
