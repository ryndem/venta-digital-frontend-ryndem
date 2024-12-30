import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Interceptor to redirect user to server error page when product request fails
 *
 * @export
 * @class ErrorInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ErrorInterceptor.
   * @param {Router} router
   */
  constructor(private router: Router) { }


  /**
   * Method to intercept request and redirect to server error page
   * @template T
   * @param {HttpRequest<T>} req
   * @param {HttpHandler} next
   * @return {Observable<HttpEvent<T>>}
   */
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.router.navigate(['/server-error']);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
