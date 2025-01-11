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
);
