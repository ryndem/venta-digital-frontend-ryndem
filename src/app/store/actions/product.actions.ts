import { createAction, props } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

export const updateCategories = createAction(
  '[Product]updateCategories',
  props<{ categories: Category[] }>()
);

export const updateOutstandingProducts = createAction(
  '[Product]updateOutstandingProducts',
  props<{ outstandingProducts: Product[] | null }>()
);

export const addOutstandingProduct = createAction(
  '[Product]addOutstandingProduct',
  props<{ outstandingProduct: Product }>()
);

export const loadCategories = createAction(
  '[Product]loadCategories'
);

export const loadCategoriesFailure = createAction(
  '[Product]loadCategoriesFailure',
  props<{ error: any }>()
);

