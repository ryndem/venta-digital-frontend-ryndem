import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(public authService: AuthService) {}

  isPasswordVisible: boolean = false;

  isServerError: boolean = false;

  isSingupRequested: boolean = false;

  isReviewPending: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      await this.authService.signUp(
        data.email,
        data.company,
        data.rfc,
        data.name,
        data.lastName,
        data.phoneNumber,
        data.jobTitle,
        data.password
      );
    } catch(e) {
      this.isServerError = true;
    }

  }

}
