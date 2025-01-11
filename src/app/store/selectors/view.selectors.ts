import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ViewState } from '../states/view.state';

export const selectViewState = createFeatureSelector<ViewState>('view');

export const selectIsFileUploading = createSelector(
    selectViewState,
    (state) => state.isFileUploading
);
