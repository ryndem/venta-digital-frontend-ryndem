import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/module-auth/auth.service';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'org-login-modal',
  templateUrl: './org-login-modal.component.html',
  styleUrls: ['./org-login-modal.component.scss'],
})
export class OrgLoginModalComponent implements OnInit {
  loginForm!: FormGroup;
  credentialsError = false;
  loading = false;
  twoFAError = false;
  isPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      this.loading = true;
      this.credentialsError = false;

      await this.authService.login(email, password);
      await this.authService.loadSession();

      this.loading = false;
      this.close();
      this.cartService.load();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error?.error) {
          switch (error.error.error) {
            case 'multiple_session':
              this.closeMultipleSessions(error.error);
              break;
            default:
              this.credentialsError = true;
          }
        }
      }
      this.loading = false;
    }
  }

  private async closeMultipleSessions(error: { idSessionTemp: string }): Promise<void> {
    await this.authService.closeMultipleSessions(error.idSessionTemp);
    await this.login();
  }

  close() {
    this.authService.closeLoginModal();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
