import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { updateIsResetPasswordRestError, updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsResetPasswordChangeSuccess, selectIsResetPasswordRestError, selectIsResetPasswordTokenExpired, selectIsResetPasswordTokenValid } from 'app/store/selectors/view.selectors';
import { resetPassword, validatePasswordToken } from 'app/store/actions/user.actions';

/**
 * Page component to reset user password
 * @export
 * @class PgResetPasswordComponent
 */
@Component({
  selector: 'pg-reset-password',
  templateUrl: './pg-reset-password.component.html',
  styleUrls: ['./pg-reset-password.component.scss'],
})
export class PgResetPasswordComponent implements OnInit {

  /**
   * Reset password form
   * @type {FormGroup}
   */
  resetPasswordForm!: FormGroup;

  /**
   * Flag to show password
   */
  isPasswordVisible = false;

  /**
   * Change password token
   */
  token = '';



  isTokenValid$: Observable<boolean>;
  restError$: Observable<boolean>;
  isTokenExpired$: Observable<boolean>;
  isPasswordChangeSuccess$: Observable<boolean>;

  
  /**
   * Creates an instance of PgResetPasswordComponent.
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} currentRoute
   * * @param {Store} store
   */
  constructor(
    private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private store: Store
  ) {
    this.isTokenValid$ = this.store.select(selectIsResetPasswordTokenValid);
    this.restError$ = this.store.select(selectIsResetPasswordRestError);
    this.isTokenExpired$ = this.store.select(selectIsResetPasswordTokenExpired);
    this.isPasswordChangeSuccess$ = this.store.select(selectIsResetPasswordChangeSuccess);
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.initializeForm();
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['token']) {
        const token = params['token'].replace(/ /g, '+');
        const decodedToken = decodeURIComponent(token);
        this.store.dispatch(validatePasswordToken({token: decodedToken}))
        this.token = decodedToken;
      } else {
        this.store.dispatch(updateIsResetPasswordRestError({ isResetPasswordRestError: true}))
      }
    });
  }

  /**
   * Initializing method for reset password form
   */
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

  /**
   * Method to show/hide password
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Method to manage submit action
   * @return {*}  {Promise<void>}
   */
  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const { password } = this.resetPasswordForm.value;
    this.store.dispatch(resetPassword({ token: this.token, password: password}))
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Reiniciar Contraseña - Proquifa',
      tags: [
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
    }));
  }
}
