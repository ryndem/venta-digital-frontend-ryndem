import { Address } from 'app/model/address';
import { User } from 'app/model/user';


/**
 * Represents the values stored on the Products Store
 * @interface UserState
 */
export interface UserState {

  /**
   * Indicates if the current user is logged
   * @type {boolean}
   */
  isLogged: boolean;
  
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

  /**
   * Indicates if the user information is already loaded
   * @type {boolean}
   */
  isLoading: boolean;


  isSignUpRequested: boolean;
  isSignUpReviewPending: boolean;
  isSignUpServerError: boolean;
  signUpErrorMessage: string;
}

/**
 * Specify initial state for UserState
 */
export const initialUserState: UserState = {
  isLogged: false,
  user: null,
  name: null,
  addresses: [],
  hasOrderItemsSelected: false,
  isLoginModalOpened: false,
  isLoading: true,
  isSignUpRequested: false,
  isSignUpReviewPending: false,
  isSignUpServerError: false,
  signUpErrorMessage: '',
};


