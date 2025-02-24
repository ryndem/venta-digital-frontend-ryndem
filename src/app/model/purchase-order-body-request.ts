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
  
  /**
   * The number of purchase orders to display per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The page number to retrieve.
   * @type {number}
   */
  desiredPage: number;

  /**
   * (Optional) - The folio number to filter the purchase orders, if applicable.
   * @type {(string | null)}
   */
  Folio?: string | null;

  /**
   * An array of filters to apply when fetching purchase orders.
   * @type {PurchaseOrderFilters[]}
   */
  filters: PurchaseOrderFilters[];
}

/**
 * Represents a filter used for querying orders.
 * @interface OrderFilters
 */
interface PurchaseOrderFilters {
  /**
   * The name of the filter to apply (e.g., "IdCliente").
   * @type {string}
   */
  FilterName: string;
  /**
   * The value of the filter. Can be a string or a boolean.
   * @type {(string | boolean)} 
   */
  FilterValue: string | boolean;
}
