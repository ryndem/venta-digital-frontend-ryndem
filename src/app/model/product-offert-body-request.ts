/**
 * Represents the body structure for a request to fetch a product offer.
 * @interface ProductOffertBodyRequest
*/

export interface ProductOffertBodyRequest {

  /**
   * The unique identifier for the product.
   * @type {string}
   */
  IdProduct: string;

  /**
   * The number of pieces requested. Defaults to 1.
   * @type {1}
   */
  Pieces: 1;

  /**
   * (Optional) - The unique identifier for the customer, if applicable.
   * @type {(string | null)}
   */
  IdCustomer?: string | null;

  /**
   * (Optional) - The unique identifier for the delivery address, if applicable.
   * @type {(string | null)}
   */
  IdDeliveryAddress?: string | null;
}
