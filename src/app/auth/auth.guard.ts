import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


/**
 * Shows login form if is needed and return a boolean to indicate if the user is authenticated
 * @returns {boolean}
 */
export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);

  if (authService.authToken()) {
    return true;
  }

  authService.openLoginModal();
  return false;
};
