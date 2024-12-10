/**
 * Represents the request structure for searching products, including pagination and optional customer association.
 *
 * @interface SearchProductRequest
 *
 * @property {string} search - The search query string to filter products.
 * @property {number} pageSize - The number of products to display per page.
 * @property {number} desiredPage - The page number to retrieve.
 * @property {string | null | undefined} idCustomer (Optional) - The unique identifier for the customer associated with the search, if applicable.
*/
export interface SearchProductRequest {
  search: string;
  pageSize: number;
  desiredPage: number;
  idCustomer?: string | null;
}
