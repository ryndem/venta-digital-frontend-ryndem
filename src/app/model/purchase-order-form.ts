import { QuoteProduct } from "./quote-product";

/**
 * Represents the structure of a form used to create or update a purchase order.
 *
 * @interface PurchaseOrderForm
 *
 * @property {string} addressId - The unique identifier for the address associated with the purchase order.
 * @property {string} idFile - The unique identifier for the file linked to the purchase order.
 * @property {OrderItem[]} orderItems - An array of items included in the purchase order.
 * @property {string} purchaseOrderNumber - The unique number assigned to the purchase order.
*/

export type PurchaseOrderForm = {
  addressId: string;
  idFile: string;
  orderItems: OrderItem[];
  purchaseOrderNumber: string;
}

/**
 * Represents an item included in a purchase order, linked to a quotation product.
 *
 * @interface OrderItem
 *
 * @property {number} quantity - The quantity of the item being ordered.
 * @property {string} quoteFolio - The folio number associated with the quotation for this item.
 * @property {QuoteProduct} item - The product details from the quotation.
 * @property {boolean} applyFleteExpress - Indicates whether express freight (flete express) is applied to this item.
*/
export type OrderItem = {
  quantity: number;
  quoteFolio: string;
  item: QuoteProduct;
  applyFleteExpress: boolean;
}
