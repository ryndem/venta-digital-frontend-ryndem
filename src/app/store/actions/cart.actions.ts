import { createAction, props } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';

export const updateCart = createAction(
  '[Cart]updateCart',
  props<{ shoppingCart: ShoppingCart | null }>()
);

export const updateCartIsLoading = createAction(
  '[Cart]updateCartIsLoading',
  props<{ isLoading: boolean }>()
);

