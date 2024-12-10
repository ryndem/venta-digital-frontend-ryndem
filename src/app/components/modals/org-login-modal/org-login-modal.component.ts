import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'org-login-modal',
  templateUrl: './org-login-modal.component.html',
  styleUrls: ['./org-login-modal.component.scss'],
})
export class LoginModalComponent {
  credentialsError = false;
  loading = false;
  twoFAError = false;
  isPasswordVisible = false;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
  ) {}

  async login(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      this.loading = true;
      this.credentialsError = false;

      await this.authService.login(data.email, data.password);
      await this.authService.loadSession();

      this.loading = false;
      this.close();
      this.cartService.load();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error && error.error.error) {
          switch (error?.error?.error) {
            case 'multiple_session':
              this.closeMultipleSessions(error?.error, form);
              break;
            default:
              this.credentialsError = true;
          }
        }
      }
      this.loading = false;
    }
  }

  private async closeMultipleSessions(
    error: { idSessionTemp: string },
    form: NgForm
  ) {
    await this.authService.closeMultipleSessions(error.idSessionTemp);
    await this.login(form);
  }

  close() {
    this.authService.closeLoginModal();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
