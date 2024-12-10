/**
 * Represents the request structure for fetching purchase orders, including pagination and optional filtering by folio or order ID.
 *
 * @interface PurchaseOrderRequest
 *
 * @property {number} pageSize - The number of purchase orders to display per page.
 * @property {number} desiredPage - The page number to retrieve.
 * @property {string | null | undefined} Folio (Optional) - The folio number to filter the purchase orders, if applicable.
 * @property {string | undefined} orderId (Optional) - The unique identifier of the order to filter results by, if applicable.
*/

export interface PurchaseOrderRequest {
  pageSize: number;
  desiredPage: number;
  Folio?: string | null;
  orderId?: string;
}
