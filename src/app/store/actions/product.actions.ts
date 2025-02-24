import { createAction, props } from '@ngrx/store';
import { OptionsGroup } from 'app/model-props/options-group';
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
 * Exports loadCategories action
 */
export const loadCategories = createAction(
  '[Product]loadCategories'
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

/**
 * Exports loadAlternativeProducts action
 */
export const loadAlternativeProducts = createAction(
  '[Product]loadAlternativeProducts',
  props<{ productId: string }>()
);

/**
 * Exports loadComplementaryProducts action
 */
export const loadComplementaryProducts = createAction(
  '[Product]loadComplementaryProducts',
  props<{ productId: string }>()
);

/**
 * Exports updateAlternativeProducts action
 */
export const updateAlternativeProducts = createAction(
  '[Product]updateAlternativeProducts',
  props<{ productId: string, products: Product[] }>()
);

/**
 * Exports updateComplementaryProducts action
 */
export const updateComplementaryProducts = createAction(
  '[Product]updateComplementaryProducts',
  props<{ productId: string, products: Product[] }>()
);

/**
 * Exports loadProductPrice action
 */
export const loadProductPrice = createAction(
  '[Product]loadProductPrice',
  props<{ productId: string }>()
);

/**
 * Exports updateProductPrice action
 */
export const updateProductPrice = createAction(
  '[Product]updateProductPrice',
  props<{ product: Product }>()
);

/**
 * Export searchProducts action
 */
export const searchProducts = createAction(
  '[Product]searchProducts',
  props<{ searchTerm: string }>()
);

/**
 * Export updateSearchResults action
 */
export const updateSearchResults = createAction(
  '[Product]updateSearchResults',
  props<{ searchResults: OptionsGroup[] }>()
);

/**
 * Export loadFeaturedProducts action
*/
export const loadFeaturedProducts = createAction('[Product]LoadFeaturedProducts');

/**
 * Export loadFeaturedProductsSuccess action
*/
export const loadFeaturedProductsSuccess = createAction(
  '[Product]LoadFeaturedProductsSuccess',
  props<{ featuredProducts: Product[] }>()
);

/**
 * Export loadFeaturedProductsSuccess action
*/
export const loadFeaturedProductsFailure = createAction(
  '[Product]LoadFeaturedProductsFailure',
  props<{ error: string }>()
);
