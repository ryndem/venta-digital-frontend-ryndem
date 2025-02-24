import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ViewState } from '../states/view.state';

export const selectViewState = createFeatureSelector<ViewState>('view');

export const selectIsFileUploading = createSelector(
    selectViewState,
    (state) => state.isFileUploading
);

export const selectIsOutstandingProductsLoading = createSelector(
    selectViewState,
    (state) => state.isOutstandingProductsLoading
);

export const selectIsProductsPageLoading = createSelector(
    selectViewState,
    (state) => state.isProductsPageLoading
);

export const selectIsPasswordResetted = createSelector(
    selectViewState,
    (state) => state.isPasswordResetted
);


export const selectIsResetPasswordTokenValid = createSelector(
    selectViewState,
    (state) => state.isResetPasswordTokenValid
);

export const selectIsResetPasswordRestError = createSelector(
    selectViewState,
    (state) => state.isResetPasswordRestError
);

export const selectIsResetPasswordTokenExpired = createSelector(
    selectViewState,
    (state) => state.isResetPasswordTokenExpired
);

export const selectIsResetPasswordChangeSuccess = createSelector(
    selectViewState,
    (state) => state.isResetPasswordChangeSuccess
);

export const selectIsProductSearchActive = createSelector(
    selectViewState,
    (state) => state.isProductSearchActive
);
