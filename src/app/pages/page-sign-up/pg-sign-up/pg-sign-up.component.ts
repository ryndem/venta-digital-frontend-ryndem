import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resetSignUpRequest, userSignUp } from 'app/store/actions/user.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectIsSignUpRequested, selectIsSignUpReviewPending, selectIsSignUpServerError, selectSignUpErrorMessage } from 'app/store/selectors/user.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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
   * Store reference (user.isSignUpServerError)
   */
  isServerError$: Observable<boolean>;

  /**
   * Store reference (user.isSignUpRequested)
   */
  isSignUpRequested$: Observable<boolean>;

  /**
   * Store reference (user.isSignUpReviewPending)
   */
  isSignUpReviewPending$: Observable<boolean>;

  /**
   * Store reference (user.errorMessage)
   */
  errorMessage$: Observable<string>;




  /**
   * Creates an instance of PgSignUpComponent.
   * @param {FormBuilder} fb
   * @param {Store} store
   */
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.isServerError$ = this.store.select(selectIsSignUpServerError);
    this.isSignUpRequested$ = this.store.select(selectIsSignUpRequested);
    this.isSignUpReviewPending$ = this.store.select(selectIsSignUpReviewPending);
    this.errorMessage$ = this.store.select(selectSignUpErrorMessage);
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(resetSignUpRequest());
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

    this.store.dispatch(resetSignUpRequest());
    this.store.dispatch(userSignUp({
      email: data.email,
      company: data.company,
      rfc: data.rfc,
      name: data.name,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      jobTitle: data.jobTitle,
      password: data.password,
      isFinalUser: data.registryType === 'isFinalUser',
      isReseller: data.registryType === 'isReseller',
    }));
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
