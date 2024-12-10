/**
 * Represents the request body structure for fetching orders, including pagination and filtering options.
 *
 * @interface OrdersBodyRequest
 *
 * @property {number} pageSize - The number of items to display per page.
 * @property {number} desiredPage - The page number to retrieve.
 * @property {OrderFilters[]} filters - An array of filters to apply when fetching orders.
*/
export interface OrdersBodyRequest {
  pageSize: number;
  desiredPage: number;
  filters: OrderFilters[]
}

/**
 * Represents a filter used for querying orders.
 *
 * @interface OrderFilters
 *
 * @property {string} FilterName - The name of the filter to apply (e.g., "IdCliente").
 * @property {string | boolean} FilterValue - The value of the filter. Can be a string or a boolean.
*/
interface OrderFilters {
  FilterName: string;
  FilterValue: string | boolean;
}
