import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { initialProductState } from '../states/product.state';

/**
 * Reducer for ProductState actions
 */
export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.updateCategories, (state, { categories }) => ({
    ...state,
    categories: categories,
  })),
  on(ProductActions.loadFeaturedProducts, (state) => ({
    ...state,
    isLoadingFeaturedProducts: true,
    error: null
  })),
  on(ProductActions.loadFeaturedProductsSuccess, (state, { featuredProducts }) => ({
    ...state,
    featuredProducts,
    isLoadingFeaturedProducts: false
  })),
  on(ProductActions.loadFeaturedProductsFailure, (state, { error }) => ({
    ...state,
    isLoadingFeaturedProducts: false,
    error
  })),
  on(ProductActions.updateProductsPage, (state, { productsPage }) => {
    return {
      ...state,
      productsPage,
    };
  }),


  on(ProductActions.addLoadedProduct, (state, { product }) => {
    const products = [...state.productDetails];
    const index = products.findIndex( p => p.idProduct == product.idProduct);

    if(index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }

    return ({
      ...state,
      productDetails: products
    })
  }),

  on(ProductActions.updateAlternativeProducts, (state, { productId, products }) => {
    const alternatives = [...state.alternativeProducts];
    const index = alternatives.findIndex( p => p.productId == productId);

    if(index >= 0) {
      alternatives[index] = {
        productId: productId,
        products: products
      };
    } else {
      alternatives.push({
        productId: productId,
        products: products
      });
    }

    return ({
      ...state,
      alternativeProducts: alternatives
    })
  }),

  on(ProductActions.updateComplementaryProducts, (state, { productId, products }) => {
    const complementaries = [...state.complementaryProducts];
    const index = complementaries.findIndex( p => p.productId == productId);

    if(index >= 0) {
      complementaries[index] = {
        productId: productId,
        products: products
      };
    } else {
      complementaries.push({
        productId: productId,
        products: products
      });
    }

    return ({
      ...state,
      complementaryProducts: complementaries
    })
  }),

  on(ProductActions.updateProductPrice, (state, { product }) => {
    const prices = [...state.productPrices];
    const index = prices.findIndex( p => p.productId == product.idProduct);

    if(index >= 0) {
      prices[index] = {
        productId: product.idProduct,
        priceVD: product.offert.unitPrice,
        priceWeb: product.offert.unitPriceWeb
      };
    } else {
      prices.push({
        productId: product.idProduct,
        priceVD: product.offert.unitPrice,
        priceWeb: product.offert.unitPriceWeb
      });
    }

    return ({
      ...state,
      productPrices: prices
    })
  }),

  on(
    ProductActions.updateSearchResults,
    (state, { searchResults }) => ({
      ...state,
      searchResults: searchResults
    })
  ),

);
