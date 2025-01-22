import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { updateIsPasswordResetted, updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsPasswordResetted } from 'app/store/selectors/view.selectors';
import { sendForgotPasswordEmail } from 'app/store/actions/user.actions';

/**
 * Page component to create a reset user password request
 * @export
 * @class PgForgotPasswordComponent
 */
@Component({
  selector: 'pg-forgot-password',
  templateUrl: './pg-forgot-password.component.html',
  styleUrls: ['./pg-forgot-password.component.scss'],
})
export class PgForgotPasswordComponent implements OnInit {

  /**
   * Forgot password form
   * @type {FormGroup}
   */
  forgotPasswordForm!: FormGroup;

  /**
   * Boolean to track if the password is resetted
   */
  isPasswordResetted$: Observable<boolean>;

  /**
   * Creates an instance of PgForgotPasswordComponent.
   * @param {FormBuilder} fb
   * @param {Store} store
   */
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.store.dispatch(updateIsPasswordResetted({ isPasswordResetted: false }))
    this.isPasswordResetted$ = this.store.select(selectIsPasswordResetted)
    this.setMetaTags();
   }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Method to initialize forgor password form
   */
  initializeForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Method to handle form submit
   * @return {*} 
   */
  async onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const { email } = this.forgotPasswordForm.value;
    this.store.dispatch(sendForgotPasswordEmail({email}));
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Olvidé mi Contraseña - Proquifa', 
      tags: [
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
    }));
  }
}
