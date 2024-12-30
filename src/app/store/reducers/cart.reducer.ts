import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Represents the values stored on the ShoppingCart Store
 * @interface ShoppingCartState
 */

export interface ShoppingCartState {

  /**
   * Stores the current shopping cart for the logged user.
   * @type {(ShoppingCart | null)}
   */
  shoppingCart: ShoppingCart | null;

  /**
   * Indicates if the shopping cart is in loading state. Some of the functionalities are blocked if the shopping cart is not ready.
   * @type {boolean}
   */
  isLoading: boolean;
}

/**
 * Specify initial state for ShoppingCartState
 */
export const initialState: ShoppingCartState = {
  shoppingCart: null,
  isLoading: true
};


/**
 * Reducer for ShoppingCartState actions
 */
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
