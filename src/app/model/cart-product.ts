import { Product } from './product';

/**
 * Represents a product in the shopping cart.
 *
 * @interface CartProduct
 *
 * @property {number} quantity - The quantity of the product in the cart.
 * @property {Product} product - The product details.
 * @property {Product[] | null} alternatives - Alternative products available for the item, if any.
 * @property {Product[] | null} complementaries - Complementary products available for the item, if any.
*/

export type CartProduct = {
  quantity: number;
  product: Product;
  alternatives: Product[] | null;
  complementaries: Product[] | null;
};
