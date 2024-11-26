import { createAction, props } from '@ngrx/store';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

export const updateUser = createAction(
  '[User]updateUser',
  props<{ user: User | null }>(),
);
export const updateIsLogged = createAction(
  '[User]updateIsLogged',
  props<{ isLogged: boolean }>(),
);
export const updateAddresses = createAction(
  '[User]updateAddresses',
  props<{ addresses: Address[] }>(),
);

export const updateSelectedOrderItems = createAction(
  '[User]updateSelectedOrderItems',
  props<{ hasOrderItemsSelected: boolean }>(),
);

export const updateLoading = createAction(
  '[User]updateLoadingState',
  props<{ loading: boolean }>()
);
