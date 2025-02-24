/**
 * Represents the parameters for a search query, including pagination, sorting, and filtering options.
 * @interface SearchParams
 */
export interface SearchParams {

  /**
   * The number of results to display per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The current page number to retrieve.
   * @type {number}
   */
  page: number;

  /**
   * The sorting direction, either ascending ('ASC') or descending ('DESC').
   * @type {('ASC' | 'DESC')}
   */
  sortDirection: 'ASC' | 'DESC';

  /**
   * The category filter to apply to the search.
   * @type {string}
   */
  category: string;

  /**
   * The search query string to filter results.
   * @type {string}
   */
  q: string;
}
