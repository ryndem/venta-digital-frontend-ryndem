import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

export interface State {
  isLogged: boolean;
  user: User | null;
  name: string | null;
  addresses: Address[] | null;
}

export const initialState: State = {
  isLogged: false,
  user: null,
  name: null,
  addresses: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.updateIsLogged, (state, { isLogged }) => ({
    ...state,
    isLogged: isLogged,
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(UserActions.updateAddresses, (state, { addresses }) => ({
    ...state,
    addresses: addresses
  }))
);
