import { Quote } from "./quote";

/**
 * Represents a confirmed order with details about items, quotations, freight, and totals.
 *
 * @interface ConfirmedOrder
 *
 * @property {string} idOrder - The unique identifier for the order.
 * @property {string} folio - The folio number of the order.
 * @property {string} address - The delivery address for the order.
 * @property {string | undefined} idPurchaseOrderFile (Optional) - The unique identifier for the purchase order file, if applicable.
 * @property {number} itemCount - The total number of items in the order.
 * @property {number} subtotal - The subtotal amount of the order.
 * @property {number} saleTax - The sale tax (IVA) amount for the order.
 * @property {number} total - The total value of the order, including taxes and freight.
 * @property {string} registrationDate - The date the order was registered in ISO format.
 * @property {Quote[]} listQuotation - A list of quotations associated with the order.
 * @property {{ amount: number; itemCount: number; }} freightExpressDetails - Details about express freight charges and item counts.
 * @property {{ amount: number; itemCount: number; }} freightOutsiderDetails - Details about outside freight charges and item counts.
*/

export type ConfirmedOrder = {
  idOrder: string;
  folio: string;
  address: string;
  idPurchaseOrderFile: string;
  itemCount: number;
  subtotal: number;
  saleTax: number;
  total: number;
  registrationDate: string;
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
 * Represents an item in a confirmed order, including metadata and financial details.
 *
 * @interface ConfirmedOrderItem
 *
 * @property {string} idOrder - The unique identifier for the order.
 * @property {string} internalOrderNumber - The internal reference number for the order (folio number).
 * @property {string} idFilePDF - The unique identifier for the PDF file associated with the order.
 * @property {string} registrationDate - The date when the order was registered, in ISO format.
 * @property {number} totalItems - The total number of items included in the order.
 * @property {number} totalVAT - The total value-added tax (IVA) applied to the order.
 * @property {number} totalAmount - The total amount of the order, including IVA.
*/

export type ConfirmedOrderItem = {
  idOrder: string,
  internalOrderNumber: string,
  idFilePDF: string,
  registrationDate: string,
  totalItems: number,
  totalVAT: number,
  totalAmount: number;
}
