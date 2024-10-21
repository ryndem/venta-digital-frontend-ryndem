import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token: string | null = this.authService.authToken();
    if (!token) {
      return next.handle(req);
    }

    // ======== Exclude token on requests ======== //
    if (req.url.includes('/Session/CloseOtherSession')) {
      return next.handle(req);
    }

    const authenticatedRequest = req.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authenticatedRequest);
  }
}
