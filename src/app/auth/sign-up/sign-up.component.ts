import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(public authService: AuthService) { }

  isPasswordVisible: boolean = false;

  isServerError: boolean = false;

  isSingupRequested: boolean = false;

  isReviewPending: boolean = false;

  errorMessage: string = '';

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const data = form.value;
    try {
      this.isServerError = false;
      this.errorMessage = '';

      const response = await this.authService.signUp(
        data.email,
        data.company,
        data.rfc,
        data.name,
        data.lastName,
        data.phoneNumber,
        data.jobTitle,
        data.password,
        data.registryType == 'isFinalUser',
        data.registryType == 'isReseller',
      );
      this.isSingupRequested = true;
      if (response.status === "pending") {
        this.isReviewPending = true;
      }
    } catch (e: unknown) {
      if (e instanceof HttpErrorResponse) {
        if (e.error?.type === 'code_not_found_customer') {
          this.isSingupRequested = true;
          this.isReviewPending = true;
        } else {
          this.isServerError = true;
          this.errorMessage =
            'Lo sentimos, parece que ha ocurrido un problema al enviar tu formulario. Por favor, inténtalo nuevamente.';
        }
      }
    }
  }
}
