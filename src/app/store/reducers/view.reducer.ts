import { createReducer, on } from '@ngrx/store';
import * as ViewActions from '../actions/view.actions';
import { initialViewState } from '../states/view.state';

/**
 * Reducer for ViewState actions
 */
export const viewReducer = createReducer(
  initialViewState,
  on(ViewActions.updateIsFileUploading, (state, { isFileUploading }) => ({
    ...state,
    isFileUploading
  })),
  on(ViewActions.updateIsOutstandingProductsLoading, (state, { isOutstandingProductsLoading }) => ({
    ...state,
    isOutstandingProductsLoading
  })),
  on(ViewActions.updateIsProductsPageLoading, (state, { isProductsPageLoading }) => ({
    ...state,
    isProductsPageLoading
  })),
  on(ViewActions.updateIsPasswordResetted, (state, { isPasswordResetted }) => ({
    ...state,
    isPasswordResetted
  })),

  on(ViewActions.updateIsResetPasswordTokenValid, (state, { isResetPasswordTokenValid }) => ({
    ...state,
    isResetPasswordTokenValid
  })),
  on(ViewActions.updateIsResetPasswordTokenExpired, (state, { isResetPasswordTokenExpired }) => ({
    ...state,
    isResetPasswordTokenExpired
  })),
  on(ViewActions.updateIsResetPasswordRestError, (state, { isResetPasswordRestError }) => ({
    ...state,
    isResetPasswordRestError
  })),
  on(ViewActions.updateIsResetPasswordChangeSuccess, (state, { isResetPasswordChangeSuccess }) => ({
    ...state,
    isResetPasswordChangeSuccess
  })),
  on(ViewActions.updateActivationState, (state, { activationState }) => ({
    ...state,
    activationState
  })),
  on(ViewActions.updateIsProductSearchActive, (state, { isProductSearchActive }) => ({
    ...state,
    isProductSearchActive
  })),
  
);
