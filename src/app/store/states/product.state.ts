import { Category } from 'app/model/category';
import { Product } from 'app/model/product';

/**
 * Represents the values stored on the Products Store
 *
 * @interface ProductState
 */

export interface ProductState {

  /**
   * List of full product details loaded
   * @type {Product[]}
   * @memberof ProductState
   */
  productDetails: Product[];

  /**
   * Selected product Id to show details
   * @type {(string | null)}
   * @memberof ProductState
   */
  selectedDetailsProductId: string | null;

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
export const initialProductState: ProductState = {
  productDetails: [],
  selectedDetailsProductId: null,
  categories: [],
  outstandingProducts: null,
};

