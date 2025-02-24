import { Address } from 'app/model/address';
import { User } from 'app/model/user';


/**
 * Represents the values stored on the Products Store
 * @interface UserState
 */
export interface UserState {

  /**
   * Indicates if the current user is logged
   * @type {boolean | null}
   */
  isLogged: boolean | null;
  
  /**
   * Contains the logged user information
   * @type {(User | null)}
   */
  user: User | null;

  /**
   * Contains the logged user name
   * @type {(string | null)}
   */
  name: string | null;

  /**
   * List of the Addresses of the logged user
   * @type {(Address[])}
   */
  addresses: Address[];

  /**
   * Flag to indicate if the user has a purchase order creation in progress
   * @type {boolean}
   */
  hasOrderItemsSelected: boolean;

  /**
   * Flag to indicate if the login modal is modal
   * @type {boolean}
   */
  isLoginModalOpened: boolean;

  isSignUpRequested: boolean;
  isSignUpReviewPending: boolean;
  isSignUpServerError: boolean;
  signUpErrorMessage: string;

  activationState: 'loading'|'successfull'|'error';
}

/**
 * Specify initial state for UserState
 */
export const initialUserState: UserState = {
  isLogged: null,
  user: null,
  name: null,
  addresses: [],
  hasOrderItemsSelected: false,
  isLoginModalOpened: false,
  isSignUpRequested: false,
  isSignUpReviewPending: false,
  isSignUpServerError: false,
  signUpErrorMessage: '',
  activationState: 'loading'
};


