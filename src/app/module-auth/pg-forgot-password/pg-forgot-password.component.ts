import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/module-auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MetaService } from 'app/services/meta.service';

@Component({
  selector: 'pg-forgot-password',
  templateUrl: './pg-forgot-password.component.html',
  styleUrls: ['./pg-forgot-password.component.scss'],
})
export class PgForgotPasswordComponent {
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private metaService: MetaService
  ) {
    this.setMetaTags();
   }

  forgotPasswordForm!: FormGroup;
  isPasswordResetted = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const { email } = this.forgotPasswordForm.value;

    try {
      await this.authService.sendForgotPasswordEmail(email);
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

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Olvidé mi Contraseña - Proquifa',
      [
        {
          name: 'description',
          content: 'Solicita un enlace para restablecer tu contraseña y recuperar el acceso a tu cuenta Proquifa de manera rápida y segura.',
        },
        {
          name: 'keywords',
          content: 'olvidé contraseña, recuperar contraseña, enlace restablecer contraseña, Proquifa, cuenta segura',
        },
        {
          property: 'og:title',
          content: 'Olvidé mi Contraseña - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Solicita un enlace para restablecer tu contraseña y recupera el acceso a tu cuenta Proquifa.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}auth/forgot-password`,
        },
        {
          name: 'twitter:title',
          content: 'Olvidé mi Contraseña - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Recibe un enlace para restablecer tu contraseña de manera rápida y segura en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}auth/forgot-password`,
        },
        {
          name: 'twitter:site',
          content: '@PROQUIFA',
        },
      ]
    );
  }
}
