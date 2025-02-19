import { createAction, props } from '@ngrx/store';

/**
 * Exports updateMetaTagsAndTitle action
 */
export const updateMetaTagsAndTitle = createAction(
  '[View]updateMetaTagsAndTitle',
  props<{ pageTitle: string, tags: { [key: string]: string }[] }>()
);

/** 
 * Exports updateIsFileUploading action
*/
export const updateIsFileUploading = createAction(
  '[View]updateIsFileUploading',
  props<{ isFileUploading: boolean}>()
)

/** 
 * Exports showSuccessNotification action
*/
export const showSuccessNotification = createAction(
  '[View]showSuccessNotification',
  props<{ message: string}>()
)

/** 
 * Exports showErrorNotification action
*/
export const showErrorNotification = createAction(
  '[View]showErrorNotification',
  props<{ message: string}>()
)

/** 
 * Exports updateIsOutstandingProductsLoading action
*/
export const updateIsOutstandingProductsLoading = createAction(
  '[View]updateIsOutstandingProductsLoading',
  props<{ isOutstandingProductsLoading: boolean}>()
)

/** 
 * Exports updateIsProductsPageLoading action
*/
export const updateIsProductsPageLoading = createAction(
  '[View]updateIsProductsPageLoading',
  props<{ isProductsPageLoading: boolean}>()
)

/**
 * Export updateIsPasswordResetted action
 */
export const updateIsPasswordResetted = createAction(
  '[View]updateIsPasswordResetted',
  props<{ isPasswordResetted: boolean }>()
);






/**
 * Export updateIsResetPasswordTokenValid action
 */
export const updateIsResetPasswordTokenValid = createAction(
  '[View]updateIsResetPasswordTokenValid',
  props<{ isResetPasswordTokenValid: boolean }>()
);

/**
 * Export updateIsResetPasswordRestError action
 */
export const updateIsResetPasswordRestError = createAction(
  '[View]updateIsResetPasswordRestError',
  props<{ isResetPasswordRestError: boolean }>()
);

/**
 * Export updateIsResetPasswordTokenExpired action
 */
export const updateIsResetPasswordTokenExpired = createAction(
  '[View]updateIsResetPasswordTokenExpired',
  props<{ isResetPasswordTokenExpired: boolean }>()
);

/**
 * Export updateIsResetPasswordChangeSuccess action
 */
export const updateIsResetPasswordChangeSuccess = createAction(
  '[View]updateIsResetPasswordChangeSuccess',
  props<{ isResetPasswordChangeSuccess: boolean }>()
);

/**
 * Export updateActivationState action
 */
export const updateActivationState = createAction(
  '[View]updateActivationState',
  props<{ activationState: 'loading'|'successfull'|'error' }>()
);

/**
 * Export updateIsProductSearchActive action
 */
export const updateIsProductSearchActive = createAction(
  '[View]updateIsProductSearchActive',
  props<{ isProductSearchActive: boolean }>()
);
