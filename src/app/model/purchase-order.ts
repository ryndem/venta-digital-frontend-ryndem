/**
 * Represents the details of a purchase order, including totals, freight information, and associated metadata.
 *
 * @interface PurchaseOrder
 *
 * @property {string} idPurchaseOrder - The unique identifier for the purchase order.
 * @property {string} folio - The folio number of the purchase order.
 * @property {string} address - The address associated with the purchase order.
 * @property {string} idPurchaseOrderFile - The unique identifier for the file linked to the purchase order.
 * @property {number} itemCount - The total number of items in the purchase order.
 * @property {number} subtotal - The subtotal amount for the purchase order, before taxes and freight.
 * @property {number} saleTax - The sales tax amount applied to the purchase order.
 * @property {string} idFilePDF - File Id to download PDF file
 * @property {Quote[]} listQuotation - Purchase order quote list
 * @property {number} total - The total amount of the purchase order, including taxes and freight.
 * @property {string} registrationDate - The date the purchase order was registered, in ISO format.
 * @property {{ amount: number; itemCount: number; }} freightExpressDetails - Details about express freight charges and the number of items included.
 * @property {{ amount: number; itemCount: number; }} freightOutsiderDetails - Details about outside freight charges and the number of items included.
 */

import { Quote } from "./quote";

export type PurchaseOrder = {
  idPurchaseOrder: string;
  folio: string;
  address: string;
  idPurchaseOrderFile: string;
  itemCount: number;
  subtotal: number;
  saleTax: number;
  total: number;
  registrationDate: string;
  idFilePDF: string;
  listQuotation: Quote[];
  freightExpressDetails: {
    amount: number;
    itemCount: number;
  },
  freightOutsiderDetails: {
    amount: number;
    itemCount: number;
  }
}

/**
 * Represents an item in a purchase order, including metadata and financial details.
 *
 * @interface PurchaseOrderItem
 *
 * @property {string} idPurchaseOrder - The unique identifier for the purchase order.
 * @property {string} folio - The folio number associated with the purchase order.
 * @property {string} idfilePdf - The unique identifier for the PDF file linked to the purchase order.
 * @property {number} items - The total number of items included in the purchase order.
 * @property {number} total - The total cost of the purchase order, including all items and taxes.
 * @property {string} registrationDate - The date the purchase order was registered, in ISO format.
*/

export type PurchaseOrderItem = {
  idPurchaseOrder: string;
  folio: string;
  idfilePdf: string;
  items: number;
  total: number;
  registrationDate: string;
}
