import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, throttleTime } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as ViewActions from '../actions/view.actions';
import { MetaService } from 'app/services/meta.service';
import { NotificationService } from 'app/services/notification.service';


/**
 * User effects to update user state
 * @export
 * @class ViewEffects
 */
@Injectable()
export class ViewEffects {


  /**
   * Creates an instance of UserEffects.
   * @param {Actions} actions$
   * @param {MetaService} metaService
   * @param {NotificationService} notificationService
   * 
   */
  constructor(
    private actions$: Actions, 
    private metaService: MetaService,
    private notificationService: NotificationService,
  ) {}

  /**
   * Effect to update meta tags and title
   */
  updateMetaTagsAndTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewActions.updateMetaTagsAndTitle),
      mergeMap((action) =>
        from(this.metaService.updateMetaTagsAndTitle(action.pageTitle, action.tags)).pipe(
          mergeMap(() => of({ type: '[View]updateMetaTagsAndTitle'})),
          catchError(() => of({ type: '[View]updateMetaTagsAndTitleFailure'}))
        )
      )
    )
  );

  /**
   * Effect to show success notification
   */
  showSuccessNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewActions.showSuccessNotification),
      throttleTime(2000),
      mergeMap((action) =>
        from(this.notificationService.showSuccess(action.message)).pipe(
          mergeMap(() => of({ type: '[View]showSuccessNotification' })),
          catchError(() => of({ type: '[View]showSuccessNotificationFailure' }))
        )
      )
    )
  );
  
  /**
   * Effect to show error notification
   */
  showErrorNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewActions.showErrorNotification),
      throttleTime(2000),
      mergeMap((action) =>
        from(this.notificationService.showError(action.message)).pipe(
          mergeMap(() => of({ type: '[View]showErrorNotification' })),
          catchError(() => of({ type: '[View]showErrorNotificationFailure' }))
        )
      )
    )
  );
}
