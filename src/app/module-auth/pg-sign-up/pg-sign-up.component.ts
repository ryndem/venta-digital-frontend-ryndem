import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/module-auth/auth.service';
import { MetaService } from 'app/services/meta.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'pg-sign-up',
  templateUrl: './pg-sign-up.component.html',
  styleUrls: ['./pg-sign-up.component.scss']
})
export class PgSignUpComponent {
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

  isPasswordVisible = false;

  isServerError = false;

  isSingupRequested = false;

  isReviewPending = false;

  errorMessage = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      registryType: ['', Validators.required],
      rfc: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      accept: [false, Validators.requiredTrue]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const data = this.signUpForm.value;

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
        data.registryType === 'isFinalUser',
        data.registryType === 'isReseller',
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

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Registrar Usuario - Proquifa',
      [
        {
          name: 'description',
          content: 'Registra tu cuenta en Proquifa y accede a nuestra gama de Material de Referencia químico y biológico. Únete al líder del mercado mexicano.',
        },
        {
          name: 'keywords',
          content: 'registrar usuario, crear cuenta, cuenta Proquifa',
        },
        {
          property: 'og:title',
          content: 'Registrar Usuario - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Crea tu cuenta en Proquifa y accede a los mejores productos químicos y biológicos.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/auth/sign-up`,
        },
        {
          name: 'twitter:title',
          content: 'Registrar Usuario - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Registra tu cuenta y únete a Proquifa, el distribuidor líder en Material de Referencia en México.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/auth/sign-up`,
        },
      ]
    );
  }
}
