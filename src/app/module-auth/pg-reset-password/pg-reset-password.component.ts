import { AuthService } from 'app/module-auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MetaService } from 'app/services/meta.service';

@Component({
  selector: 'pg-reset-password',
  templateUrl: './pg-reset-password.component.html',
  styleUrls: ['./pg-reset-password.component.scss'],
})
export class PgResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  isTokenValid = false;

  isPasswordVisible = false;

  restError = false;

  isTokenExpired = false;

  isPasswordChangeSuccess = false;

  token = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private currentRoute: ActivatedRoute,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

  ngOnInit(): void {
    this.initializeForm();
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

  initializeForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{};:,<.>])[A-Za-z\\d!@#$%^&*()\\-_=+{};:,<.>]{8,}$'
          ),
        ],
      ],
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

  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const { password } = this.resetPasswordForm.value;

    try {
      await this.authService.resetPassword(this.token, password);
      if (this.restError) this.restError = false;
      this.isPasswordChangeSuccess = true;
    } catch (error) {
      this.restError = true;
    }
  }

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Reiniciar Contraseña - Proquifa',
      [
        {
          name: 'description',
          content: 'Recupera el acceso a tu cuenta. Restablece tu contraseña de forma segura y rápida.',
        },
        {
          name: 'keywords',
          content: 'reiniciar contraseña, recuperar acceso, restablecer contraseña, Proquifa',
        },
        {
          property: 'og:title',
          content: 'Reiniciar Contraseña - Proquifa',
        },
        {
          property: 'og:description',
          content: '¿Olvidaste tu contraseña? Restablécela y recupera tu acceso de manera segura.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/reset-password`,
        },
        {
          name: 'twitter:title',
          content: 'Reiniciar Contraseña - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Recupera tu acceso restableciendo tu contraseña de manera fácil y segura.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/reset-password`,
        },
        {
          name: 'twitter:site',
          content: '@PROQUIFA',
        },
      ]
    );
  }
}
