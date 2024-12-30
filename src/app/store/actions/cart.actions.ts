import { createAction, props } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';


/**
 * Exports loadCart action
 */
export const loadCart = createAction(
  '[Cart]loadCart'
);

/**
 * Exports loadCartFailure action
 */
export const loadCartFailure = createAction(
  '[Cart]loadCartFailure',
  props<{ error: any }>()
);

/**
 * Exports updateCart action
 */
export const updateCart = createAction(
  '[Cart]updateCart',
  props<{ shoppingCart: ShoppingCart | null }>()
);

/**
 * Exports updateCartIsLoading action
 */
export const updateCartIsLoading = createAction(
  '[Cart]updateCartIsLoading',
  props<{ isLoading: boolean }>()
);

