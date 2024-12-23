import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Represents the values stored on the ShoppingCart Store
 *
 * @interface ShoppingCartState
 *
 * @property {ShoppingCart | null} shoppingCart - Stores the current shopping cart for the logged user.
 * @property {boolean} isLoading - Indicates if the shopping cart is in loading state. Some of the functionalities are blocked if the shopping cart is not ready.
 */

export interface ShoppingCartState {
  shoppingCart: ShoppingCart | null;
  isLoading: boolean;
}

export const initialState: ShoppingCartState = {
  shoppingCart: null,
  isLoading: true
};

export const cartReducer = createReducer(
  initialState,
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
