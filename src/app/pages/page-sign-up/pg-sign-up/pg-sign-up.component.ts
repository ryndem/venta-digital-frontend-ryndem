import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { ViewState } from 'app/store/states/view.state';
import { environment } from 'environments/environment';

/**
 * Page component to create a user sign up request
 * @export
 * @class PgSignUpComponent
 */
@Component({
  selector: 'pg-sign-up',
  templateUrl: './pg-sign-up.component.html',
  styleUrls: ['./pg-sign-up.component.scss']
})
export class PgSignUpComponent implements OnInit {
  /**
   * Sign up form
   * @type {FormGroup}
   */
  signUpForm!: FormGroup;

  /**
   * Boolean to track if the password is visible
   */
  isPasswordVisible = false;

  /**
   * Boolean to track if the request failed/rejected by the API
   */
  isServerError = false;

  /**
   * Boolean to track if the sign up is already sent
   */
  isSingupRequested = false;

  /**
   * Boolean to track if the user has to be reviewed
   */
  isReviewPending = false;

  /**
   * Sign up request error message
   */
  errorMessage = '';

  /**
   * Creates an instance of PgSignUpComponent.
   * @param {FormBuilder} fb
   * @param {AuthService} authService
   * @param {Store<ViewState>} store
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<ViewState>,
  ) {
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes sign up form
   */
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

  /**
   * Method to toggle password visibility
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Method to handle submit action
   * @return {Promise<void>}
   */
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
        } else if (e.error?.type === 'code_password_requirement') {
          this.isServerError = true;
          this.errorMessage = 'Lo sentimos, tu contraseña no cumple con los requisitos mínimos de seguridad. Intenta una nueva.';
        } else {
          this.isServerError = true;
          this.errorMessage =
            'Lo sentimos, parece que ha ocurrido un problema al enviar tu formulario. Por favor, inténtalo nuevamente.';
        }
      }
    }
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Registrar Usuario - Proquifa', 
      tags: [
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
    }));
  }
}
