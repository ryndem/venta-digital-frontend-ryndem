/**
 * Represents the parameters for a search query, including pagination, sorting, and filtering options.
 *
 * @interface SearchParams
 *
 * @property {number} pageSize - The number of results to display per page.
 * @property {number} page - The current page number to retrieve.
 * @property {'ASC' | 'DESC'} sortDirection - The sorting direction, either ascending ('ASC') or descending ('DESC').
 * @property {string} category - The category filter to apply to the search.
 * @property {string} q - The search query string to filter results.
*/

export interface SearchParams {
  pageSize: number;
  page: number;
  sortDirection: 'ASC' | 'DESC';
  category: string;
  q: string;
}
