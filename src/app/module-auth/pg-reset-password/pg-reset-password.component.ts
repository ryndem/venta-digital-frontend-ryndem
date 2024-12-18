import { AuthService } from 'app/module-auth/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'pg-reset-password',
  templateUrl: './pg-reset-password.component.html',
  styleUrls: ['./pg-reset-password.component.scss'],
})
export class PgResetPasswordComponent {
  isTokenValid = false;

  isPasswordVisible = false;

  restError = false;

  isTokenExpired = false;

  isPasswordChangeSuccess = false;

  token = '';

  constructor(
    public authService: AuthService,
    private currentRoute: ActivatedRoute,
  ) {
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['token']) {
        const token = params['token'].replace(/ /g, '+');
        const decodedToken = decodeURIComponent(token);
        this.processActivation(decodedToken);
        this.token = decodedToken;
      } else {
        this.restError = true;
      }
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async processActivation(token: string) {
    try {
      await this.authService.validateRequestResetPassword(token);
      this.isTokenValid = true;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.error?.type === "code_requestResetToken_expired" ) {
          this.isTokenExpired = true;
        } else {
          this.restError = true;
        }
      }
    }
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      await this.authService.resetPassword(this.token, data.password);
      if (this.restError) this.restError = false;
      this.isPasswordChangeSuccess = true;
    } catch (error) {
      this.restError = true;
    }
  }
}
