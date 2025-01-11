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