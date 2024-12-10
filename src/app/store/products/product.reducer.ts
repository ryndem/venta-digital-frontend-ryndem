import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

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
