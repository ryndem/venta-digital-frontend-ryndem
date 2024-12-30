import { createAction, props } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

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
 * Exports loadCategoriesFailure action
 */
export const loadCategoriesFailure = createAction(
  '[Product]loadCategoriesFailure',
  props<{ error: any }>()
);

