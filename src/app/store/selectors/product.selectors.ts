import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from '../states/product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectCategories = createSelector(
    selectProductState,
    (state) => state.categories
);

export const selectOutstandingProducts = createSelector(
    selectProductState,
    (state) => state.outstandingProducts
);

export const selectProductDetails = createSelector(
    selectProductState,
    (state) =>
        state.productDetails.find((product) => product.idProduct === state.selectedDetailsProductId)
);