import { createAction, props } from '@ngrx/store';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

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
 * Exports updateSelectedOrderItems action
 */
export const updateSelectedOrderItems = createAction(
  '[User]updateSelectedOrderItems',
  props<{ hasOrderItemsSelected: boolean }>(),
);

/**
 * Exports updateLoading action
 */
export const updateLoading = createAction(
  '[User]updateLoadingState',
  props<{ loading: boolean }>()
);

/**
 * Export loadSession action
 */
export const loadSession = createAction(
  '[User]loadSession'
);

/**
 * Export loadSessionError action
 */
export const loadSessionError = createAction(
  '[User]loadSessionError'
);
