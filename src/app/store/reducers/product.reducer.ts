import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

/**
 * Represents the values stored on the Products Store
 *
 * @interface ProductState
 *
 * @property {Category[]} categories - List of the product categories loaded.
 * @property {Product[] | null} outstandingProducts - List of the outstanding products.
 */

export interface ProductState {
  categories: Category[];
  outstandingProducts: Product[] | null;
}

export const initialState: ProductState = {
  categories: [],
  outstandingProducts: null,
};

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
