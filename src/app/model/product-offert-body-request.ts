/**
 * Represents the body structure for a request to fetch a product offer.
 *
 * @interface ProductOffertBodyRequest
 *
 * @property {string} IdProduct - The unique identifier for the product.
 * @property {number} Pieces - The number of pieces requested. Defaults to 1.
 * @property {string | null | undefined} IdCustomer (Optional) - The unique identifier for the customer, if applicable.
 * @property {string | null | undefined} IdDeliveryAddress (Optional) - The unique identifier for the delivery address, if applicable.
*/

export interface ProductOffertBodyRequest {
  IdProduct: string;
  Pieces: 1;
  IdCustomer?: string | null;
  IdDeliveryAddress?: string | null;
}
