import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from '../states/product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectCategories = createSelector(
    selectProductState,
    (state) => state.categories
);

export const selectFeaturedProducts = createSelector(
  selectProductState,
  (state) => state.featuredProducts
);

export const selectIsLoadingFeaturedProducts = createSelector(
  selectProductState,
  (state) => state.isLoadingFeaturedProducts
);

export const selectProductDetails = (id:string) => createSelector(
    selectProductState,
    (state) =>
        state.productDetails.find((product) => product.idProduct === id) || null
);

export const selectProductPage = createSelector(
    selectProductState,
    (state) =>
        state.productsPage
);

export const selectAlternativeProducts = (productId:string) => createSelector(
    selectProductState,
    (state) =>
        state.alternativeProducts.find((product) => product.productId === productId)?.products || null
);

export const selectComplementaryProducts = (productId:string) => createSelector(
    selectProductState,
    (state) =>
        state.complementaryProducts.find((product) => product.productId === productId)?.products || null
);

export const selectProductPriceWeb = (productId: string) => createSelector(
    selectProductState,
    (state) =>
        state.productPrices.find((product) => product.productId === productId)?.priceWeb || null
);

export const selectProductPriceVD = (productId:string) => createSelector(
    selectProductState,
    (state) =>
        state.productPrices.find((product) => product.productId === productId)?.priceVD || null
);

export const selectSearchResults = createSelector(
    selectProductState,
    (state) =>
        state.searchResults
);

