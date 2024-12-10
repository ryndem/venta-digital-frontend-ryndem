import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { ShoppingCart } from 'app/model/shopping-cart';

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
