import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShoppingCartState } from '../states/cart.state';

export const selectCartState = createFeatureSelector<ShoppingCartState>('cart');

export const selectCurrentCart = createSelector(
    selectCartState,
    (state) => state.shoppingCart
);

export const selectCartIsLoading = createSelector(
    selectCartState,
    (state) => state.isLoading
);
