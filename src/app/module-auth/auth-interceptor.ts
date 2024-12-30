import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';

/**
 * Interceptor to handle every http request
 * @export
 * @class AuthInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  /**
   * Creates an instance of AuthInterceptorService.
   * @param {AuthService} authService
   */
  constructor(private authService: AuthService) { }

  /**
   * Method to intercept every http request to add auth bearer token if exists
   *
   * @template T
   * @param {HttpRequest<T>} req
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<T>>}
   */
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    const token = this.authService.authToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return from(this.authService.refreshToken()).pipe(
            switchMap((newToken) => {
              if (newToken) {
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken.access_token}` },
                });
                return next.handle(retryReq);
              }
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
