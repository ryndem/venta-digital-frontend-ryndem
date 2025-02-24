import { createAction, props } from '@ngrx/store';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

/**
 * Exports logout action
 */
export const logout = createAction(
  '[User]logout'
);

/**
 * Exports logout success action
*/
export const logoutSuccess = createAction(
  '[User]logoutSuccess'
);

/**
 * Exports updateUser action
 */
export const updateUser = createAction(
  '[User]updateUser',
  props<{ user: User | null }>(),
);

/**
 * Exports updateIsLogged action
 */
export const updateIsLogged = createAction(
  '[User]updateIsLogged',
  props<{ isLogged: boolean }>(),
);

/**
 * Exports updateAddresses action
 */
export const updateAddresses = createAction(
  '[User]updateAddresses',
  props<{ addresses: Address[] }>(),
);

/**
 * Exports updateAddresses action
 */
export const updateIsLoginModalOpened = createAction(
  '[User]updateIsLoginModalOpened',
  props<{ isLoginModalOpened: boolean }>(),
);

/**
 * Exports updateSelectedOrderItems action
 */
export const updateSelectedOrderItems = createAction(
  '[User]updateSelectedOrderItems',
  props<{ hasOrderItemsSelected: boolean }>(),
);

/**
 * Export loadSession action
 */
export const loadSession = createAction(
  '[User]loadSession'
);

/**
 * Export sendForgotPasswordEmail action
 */
export const sendForgotPasswordEmail = createAction(
  '[User]sendForgotPasswordEmail',
  props<{ email: string }>()
);


/**
 * Export userSignUp action
 */
export const userSignUp = createAction(
  '[User]userSignUp',
  props<{ 
    email: string,
    company: string,
    rfc: string,
    name: string,
    lastName: string,
    phoneNumber: string,
    jobTitle: string,
    password: string,
    isFinalUser: boolean,
    isReseller: boolean,
  }>()
);

/**
 * Export resetSignUpRequest action
 */
export const resetSignUpRequest = createAction(
  '[User]resetSignUpRequest'
);


/**
 * Export updateIsSignUpRequested action
 */
export const updateIsSignUpRequested = createAction(
  '[User]updateIsSignUpRequested',
  props<{ isSignUpRequested: boolean }>()
);

/**
 * Export updateIsSignUpReviewPending action
 */
export const updateIsSignUpReviewPending = createAction(
  '[User]updateIsSignUpReviewPending',
  props<{ isSignUpReviewPending: boolean }>()
);

/**
 * Export updateIsSignUpServerError action
 */
export const updateIsSignUpServerError = createAction(
  '[User]updateIsSignUpServerError',
  props<{ isSignUpServerError: boolean }>()
);

/**
 * Export updateErrorMessage action
 */
export const updateSignUpErrorMessage = createAction(
  '[User]updateSignUpErrorMessage',
  props<{ signUpErrorMessage: string }>()
);

/**
 * Export validatePasswordToken action
 */
export const validatePasswordToken = createAction(
  '[User]validatePasswordToken',
  props<{ token: string }>()
);

/**
 * Export resetPassword action
 */
export const resetPassword = createAction(
  '[User]resetPassword',
  props<{ token: string, password: string }>()
);


/**
 * Export activateUser action
 */
export const activateUser = createAction(
  '[User]activateUser',
  props<{ token: string }>()
);