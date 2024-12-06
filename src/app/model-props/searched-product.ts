/**
 * Represents a product returned from a search query.
 *
 * @interface SearchedProduct
 *
 * @property {string} idProducto - The unique identifier for the product.
 * @property {string} description - A brief description of the product.
 */

export type SearchedProduct = {
  idProducto: string;
  description: string;
};
