import { AuthService } from 'app/auth/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(public authService: AuthService) {}

  isPasswordVisible: boolean = false;

  restError: boolean = false;

  isTokenExpired: boolean = false;


  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      this.authService.resetPassword(data.password);
    } catch(exception) {
      this.restError = true;
    }

  }

}
