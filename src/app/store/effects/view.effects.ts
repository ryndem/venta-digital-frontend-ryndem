import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
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
          map(() => of('[View]updateMetaTagsAndTitle')),
          catchError(() => of('[View]updateMetaTagsAndTitleFailure'))
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
        mergeMap((action) =>
          from(this.notificationService.showSuccess(action.message)).pipe(
            mergeMap(() => of({ type: '[Cart]showSuccessNotification' })),
            catchError(() => of({ type: '[Cart]showSuccessNotificationFailure' }))
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
          mergeMap((action) =>
            from(this.notificationService.showError(action.message)).pipe(
              mergeMap(() => of({ type: '[Cart]showErrorNotification' })),
              catchError(() => of({ type: '[Cart]showErrorNotificationFailure' }))
            )
          )
        )
      );
}
