import { createAction, props } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { SearchParams } from 'app/model/search-params';

/**
 * Exports updateCategories action
 */
export const updateCategories = createAction(
  '[Product]updateCategories',
  props<{ categories: Category[] }>()
);

/**
 * Exports updateOutstandingProducts action
 */
export const updateOutstandingProducts = createAction(
  '[Product]updateOutstandingProducts',
  props<{ outstandingProducts: Product[] | null }>()
);

/**
 * Exports addOutstandingProduct action
 */
export const addOutstandingProduct = createAction(
  '[Product]addOutstandingProduct',
  props<{ outstandingProduct: Product }>()
);

/**
 * Exports loadCategories action
 */
export const loadCategories = createAction(
  '[Product]loadCategories'
);

/**
 * Exports loadCategories action
 */
export const loadOutstandingProducts = createAction(
  '[Product]loadOutstandingProducts'
);

/**
 * Exports updateProductsPage action
 */
export const updateProductsPage = createAction(
  '[Product]updateProductsPage',
  props<{ productsPage: ProductResponse }>()
);

/**
 * Exports loadProductPage action
 */
export const loadProductPage = createAction(
  '[Product]loadProductPage',
  props<{ searchParams: SearchParams }>()
);

/**
 * Exports addLoadedProduct action
 */
export const addLoadedProduct = createAction(
  '[Product]addLoadedProduct',
  props<{ product: Product }>()
);

/**
 * Exports loadProductById action
 */
export const loadProductById = createAction(
  '[Product]loadProductById',
  props<{ productId: string }>()
);





