import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { AuthService } from 'app/module-auth/auth.service';


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
  constructor(private actions$: Actions, private authService: AuthService) {}

  /**
   * Effect to load product categories
   */
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadSession),
      mergeMap(() =>
        from(this.authService.loadSession()).pipe(
          map( user => {
            return UserActions.updateUser({user: user})
          }),
          catchError(() => {
            return of(UserActions.updateUser({user: null}));
          })
        )
      )
    )
  );
}
