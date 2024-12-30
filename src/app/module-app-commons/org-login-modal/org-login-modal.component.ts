import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { loadCart } from 'app/store/actions/cart.actions';
import { loadSession } from 'app/store/actions/user.actions';
import { UserState } from 'app/store/reducers/user.reducer';

/**
 * Login modal component
 * @export
 * @class OrgLoginModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-login-modal',
  templateUrl: './org-login-modal.component.html',
  styleUrls: ['./org-login-modal.component.scss'],
})
export class OrgLoginModalComponent implements OnInit {
  
  /**
   * Login form
   * @type {FormGroup}
   */
  loginForm!: FormGroup;

  /**
   * Flag to show credentials error
   */
  credentialsError = false;


  /**
   * Flag to set loading state
   */
  loading = false;

  /**
   * Flag to make password visible
   */
  isPasswordVisible = false;

  /**
   * Creates an instance of OrgLoginModalComponent.
   * @param {FormBuilder} fb
   * @param {AuthService} authService
   * @param {CartService} cartService
   */
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store<{ user: UserState}>
  ) { }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Method to initualize form
   */
  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Login to manage login action
   * @return {Promise<void>}
   */
  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      this.loading = true;
      this.credentialsError = false;

      await this.authService.login(email, password);
      this.store.dispatch(loadSession());


      this.loading = false;
      this.close();
      this.store.dispatch(loadCart());
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error?.error) {
          switch (error.error.error) {
            case 'multiple_session':
              this.closeMultipleSessions(error.error);
              break;
            default:
              this.credentialsError = true;
          }
        }
      }
      this.loading = false;
    }
  }

  /**
   * Method to close multiple user sessions
   * @private
   * @param {{ idSessionTemp: string }} error
   * @return {Promise<void>}
   */
  private async closeMultipleSessions(error: { idSessionTemp: string }): Promise<void> {
    await this.authService.closeMultipleSessions(error.idSessionTemp);
    await this.login();
  }

  /**
   * Method to close login modal
   */
  close() {
    this.authService.closeLoginModal();
  }

  /**
   * Method to toggle password visibility
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
