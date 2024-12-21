import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';


/**
 * Represents the values stored on the Products Store
 *
 * @interface UserState
 *
 * @property {boolean} isLogged - Indicates if the current user is logged
 * @property {User | null} user - Contains the logged user information
 * @property {string | null} name - Contains the logged user name
 * @property {Address[] | null} addresses - List of the Addresses of the logged user
 * @property {boolean} hasOrderItemsSelected - Flag to indicate if the user has a purchase order creation in progress
 * @property {boolean} loading - Indicates if the user information is already loaded
 */

export interface UserState {
  isLogged: boolean;
  user: User | null;
  name: string | null;
  addresses: Address[] | null;
  hasOrderItemsSelected: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  isLogged: false,
  user: null,
  name: null,
  addresses: null,
  hasOrderItemsSelected: false,
  loading: true
};

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

