import { Product } from "./product";

/**
 * Represents a paginated list of products.
 *
 * @interface ProductResponse
 *
 * @property {number} totalResults - The total number of order items available across all pages.
 * @property {Product[]} results - An array of products on the current page.
*/

export type ProductResponse = {
  totalResults: number;
  results: Product[];
};
