import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
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
   * @type {(Address[] | null)}
   */
  addresses: Address[] | null;

  /**
   * Flag to indicate if the user has a purchase order creation in progress
   * @type {boolean}
   */
  hasOrderItemsSelected: boolean;

  /**
   * Indicates if the user information is already loaded
   * @type {boolean}
   */
  loading: boolean;

}

/**
 * Specify initial state for UserState
 */
export const initialState: UserState = {
  isLogged: false,
  user: null,
  name: null,
  addresses: null,
  hasOrderItemsSelected: false,
  loading: true
};

/**
 * Reducer for UserState actions
 */
export const userReducer = createReducer(
  initialState,
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
  on(UserActions.updateLoading, (state, { loading }) => ({
    ...state,
    loading
  }))
);

