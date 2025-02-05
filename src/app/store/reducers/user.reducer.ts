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
  on(UserActions.resetSignUpRequest, (state) => ({
    ...state,
    isSignUpRequested: false,
    isSignUpReviewPending: false,
    isSignUpServerError: false,
    signUpErrorMessage: '',
  })),
  on(UserActions.updateIsSignUpRequested, (state, { isSignUpRequested }) => ({
    ...state,
    isSignUpRequested
  })),
  on(UserActions.updateIsSignUpReviewPending, (state, { isSignUpReviewPending }) => ({
    ...state,
    isSignUpReviewPending
  })),
  on(UserActions.updateSignUpErrorMessage, (state, { signUpErrorMessage }) => ({
    ...state,
    signUpErrorMessage
  })),
  on(UserActions.updateIsSignUpServerError, (state, { isSignUpServerError }) => ({
    ...state,
    isSignUpServerError
  })),
);