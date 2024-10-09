import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authService: AuthService = inject(AuthService);

    const token: string | null = authService.authToken();
    
    if (token) {
        return true;
    }
    
    authService.openLoginModal();
    return false;

}