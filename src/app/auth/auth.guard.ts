import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.authToken();

  if (token) {
    return true;
  }

  authService.openLoginModal();
  return false;
};
