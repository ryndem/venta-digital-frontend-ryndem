import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { initialCartState } from '../states/cart.state';

/**
 * Reducer for ShoppingCartState actions
 */
export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.updateCart, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart: shoppingCart,
    isLoading: false
  })),
  on(CartActions.updateCartIsLoading, (state, { isLoading })=> ({
    ...state,
    isLoading: isLoading
  }))
);
