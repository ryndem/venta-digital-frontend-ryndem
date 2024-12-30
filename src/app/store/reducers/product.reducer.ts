import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

/**
 * Represents the values stored on the Products Store
 *
 * @interface ProductState
 */

export interface ProductState {

  /**
   * List of the product categories loaded.
   * @type {Category[]}
   */
  categories: Category[];

  /**
   * List of the outstanding products.
   * @type {(Product[] | null)}
   */
  outstandingProducts: Product[] | null;
}

/**
 * Specify initial state for ProductState
 */
export const initialState: ProductState = {
  categories: [],
  outstandingProducts: null,
};


/**
 * Reducer for ProductState actions
 */
export const productReducer = createReducer(
  initialState,
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
