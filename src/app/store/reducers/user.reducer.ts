import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { initialUserState } from '../states/user.state';


/**
 * Reducer for UserState actions
 */
export const userReducer = createReducer(
  initialUserState,
  on(UserActions.updateIsLogged, (state, { isLogged }) => ({
    ...state,
    isLogged
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    user
  })),
  on(UserActions.updateAddresses, (state, { addresses }) => ({
    ...state,
    addresses
  })),
  on(UserActions.updateSelectedOrderItems, (state, { hasOrderItemsSelected }) => ({
    ...state,
    hasOrderItemsSelected
  })),
  on(UserActions.updateIsLoginModalOpened, (state, { isLoginModalOpened }) => ({
    ...state,
    isLoginModalOpened
  })),
  on(UserActions.updateLoading, (state, { isLoading }) => ({
    ...state,
    isLoading
  }))
);

