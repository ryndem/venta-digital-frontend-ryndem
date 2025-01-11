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
  on(
    ProductActions.updateOutstandingProducts,
    (state, { outstandingProducts }) => ({
      ...state,
      outstandingProducts: outstandingProducts,
    })
  ),
  on(ProductActions.addOutstandingProduct, (state, { outstandingProduct }) => {
    const products = (state.outstandingProducts || []).slice();
    products.push(outstandingProduct);
    return {
      ...state,
      outstandingProducts: products,
    };
  })
);
