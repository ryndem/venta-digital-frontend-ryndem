import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/module-auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'pg-forgot-password',
  templateUrl: './pg-forgot-password.component.html',
  styleUrls: ['./pg-forgot-password.component.scss'],
})
export class PgForgotPasswordComponent {
  constructor(public authService: AuthService) { }

  isPasswordResetted = false;

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const data = form.value;

    try {
      await this.authService.sendForgotPasswordEmail(data.email);
      this.isPasswordResetted = true;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 410) {
          this.isPasswordResetted = true;
        }
      } else {
        console.error('An unexpected error occurred');
      }
    }
  }
}
