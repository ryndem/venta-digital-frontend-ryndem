import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, throttleTime } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { AuthService } from 'app/auth/auth.service';


/**
 * User effects to update user state
 * @export
 * @class UserEffects
 */
@Injectable()
export class UserEffects {


  /**
   * Creates an instance of UserEffects.
   * @param {Actions} actions$
   * @param {AuthService} authService
   */
  constructor(
    private actions$: Actions, 
    private authService: AuthService
  ) {}

  /**
   * Effect to load user session
   */
  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadSession),
      mergeMap(() =>
        from(this.authService.loadSession()).pipe(
          map( user => UserActions.updateUser({user: user})),
          catchError(() => of(UserActions.updateUser({user: null})))
        )
      )
    )
  );

  /**
   * Effect to logout password
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap(() =>
        from(this.authService.logout()).pipe(
          mergeMap(() => of({ type: '[User]logoutSuccess' })),
          catchError(() => of({ type: '[User]logoutFailure' }))
        )
      )
    )
  );

  /**
   * Effect to reset user password
   */
  sendForgotPasswordEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.sendForgotPasswordEmail),
      throttleTime(6000),
      mergeMap(action =>
        from(this.authService.sendForgotPasswordEmail(action.email)).pipe(
          mergeMap(() => of({ type: '[User]sendForgotPasswordEmail' })),
          catchError(() => of({ type: '[User]sendForgotPasswordEmailFailure' }))
        )
      )
    )
  );

  /**
   * Effect to create user sign up
   */
  userSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userSignUp),
      throttleTime(5000),
      mergeMap(action =>
        from(this.authService.signUp(
              action.email,
              action.company,
              action.rfc,
              action.name,
              action.lastName,
              action.phoneNumber,
              action.jobTitle,
              action.password,
              action.isFinalUser,
              action.isReseller,
            )).pipe(
          mergeMap(() => of({ type: '[User]userSignUp' })),
          catchError(() => of({ type: '[User]userSignUpFailure' }))
        )
      ),
    ),
  );


  /**
   * Effect to create user sign up
   */
  validatePasswordToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.validatePasswordToken),
      throttleTime(5000),
      mergeMap(action =>
        from(this.authService.validateRequestResetPassword(action.token)).pipe(
          mergeMap(() => of({ type: '[User]validatePasswordToken' })),
          catchError(() => of({ type: '[User]validatePasswordTokenFailure' }))
        )
      ),
    ),
  );

    /**
   * Effect to create user sign up
   */
    resetPassword$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.resetPassword),
        throttleTime(5000),
        mergeMap(action =>
          from(this.authService.resetPassword(action.token, action.password)).pipe(
            mergeMap(() => of({ type: '[User]resetPassword' })),
            catchError(() => of({ type: '[User]resetPasswordFailure' }))
          )
        ),
      ),
    );

}
