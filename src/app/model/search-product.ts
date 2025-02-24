/**
 * Represents the request structure for searching products, including pagination and optional customer association.
 * @interface SearchProductRequest
*/
export interface SearchProductRequest {

  /**
   * The search query string to filter products.
   * @type {string}
   */
  search: string;

  /**
   * The number of products to display per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The page number to retrieve.
   * @type {number}
   */
  desiredPage: number;

  /**
   * (Optional) - The unique identifier for the customer associated with the search, if applicable.
   * @type {(string | null)}
   */
  idCustomer?: string | null;
}
