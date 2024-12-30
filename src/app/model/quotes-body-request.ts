/**
 * Represents the body structure for a request to fetch quotations, including pagination, sorting, and filters.
 * @interface QuotesBodyRequest
*/
export interface QuotesBodyRequest {
  
  /**
   * The number of quotations to display per page.
   * @type {number}
   */
  pageSize: number;

  /**
   * The page number to retrieve.
   * @type {number}
   */
  desiredPage: number;

  /**
   * The field to sort the quotations by.
   * @type {string}
   */
  SortField: string;

  /**
   * The direction of the sort, either "ASC" or "DESC".
   * @type {string}
   */
  SortDirection: string;

  /**
   * An array of filters to apply to the quotations.
   * @type {QuoteFilter[]}
   */
  filters: QuoteFilter[];

}



/**
 * Represents a filter used for querying quotations.
 * @interface QuoteFilter
*/
export interface QuoteFilter {

  /**
   *The name of the filter to apply.
   * @type {string}
   */
  FilterName: string;

  /**
   * The value of the filter. Can be a string or a boolean.
   * @type {(string | boolean)}
   */
  FilterValue: string | boolean;

}
