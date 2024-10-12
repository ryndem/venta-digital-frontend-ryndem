import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(public authService: AuthService) {}

  isPasswordResetted: boolean = false;

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      await this.authService.sendForgotPasswordEmail(data.email);
      this.isPasswordResetted = true;
    } catch (exception) {
      throw exception;
    }
  }
}
