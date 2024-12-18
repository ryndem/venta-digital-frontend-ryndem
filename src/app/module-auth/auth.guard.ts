import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);

  if (authService.authToken()) {
    return true;
  }

  authService.openLoginModal();
  return false;
};
