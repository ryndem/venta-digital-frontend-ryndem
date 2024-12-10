import { PurchaseOrderItem } from "./purchase-order";

/**
 * Represents a paginated list of purchase orders.
 *
 * @interface PurchaseOrderPage
 *
 * @property {number} totalResults - The total number of purchases  available across all pages.
 * @property {PurchaseOrderItem[]} results - An array of purchase order on the current page.
*/

export type PurchaseOrderPage = {
  totalResults: number;
  results: PurchaseOrderItem[];
};
