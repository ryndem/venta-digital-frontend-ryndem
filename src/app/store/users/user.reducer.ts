import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

export interface State {
  isLogged: boolean;
  user: User | null;
  name: string | null;
  addresses: Address[] | null;
  hasOrderItemsSelected: boolean;
  loading: boolean;
}

export const initialState: State = {
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

