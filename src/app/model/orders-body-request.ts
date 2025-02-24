/**
 * Represents the request body structure for fetching orders, including pagination and filtering options.
 * @interface OrdersBodyRequest
 */
export interface OrdersBodyRequest {
  /**
   * The number of items to display per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The page number to retrieve.
   * @type {number}
   */
  desiredPage: number;

  /**
   * An array of filters to apply when fetching orders.
   * @type {OrderFilters[]}
   */
  filters: OrderFilters[];
}

/**
 * Represents a filter used for querying orders.
 * @interface OrderFilters
 */
interface OrderFilters {
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
