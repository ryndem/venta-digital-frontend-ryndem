import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface State {
  isLogged: boolean;
  fullName: string | null;
}

export const initialState: State = {
  isLogged: false,
  fullName: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.updateName, (state, { fullName }) => ({
    ...state,
    fullName: fullName,
  })),
  on(UserActions.updateIsLogged, (state, { isLogged }) => ({
    ...state,
    isLogged: isLogged,
  })),
);
