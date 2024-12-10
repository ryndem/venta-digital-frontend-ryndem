/**
 * Represents the body structure for a request to fetch quotations, including pagination, sorting, and filters.
 *
 * @interface QuotesBodyRequest
 *
 * @property {number} pageSize - The number of quotations to display per page.
 * @property {number} desiredPage - The page number to retrieve.
 * @property {string} SortField - The field to sort the quotations by.
 * @property {string} SortDirection - The direction of the sort, either "ASC" or "DESC".
 * @property {QuoteFilter[]} filters - An array of filters to apply to the quotations.
*/

export interface QuotesBodyRequest {
  pageSize: number;
  desiredPage: number;
  SortField: string;
  SortDirection: string;
  filters: QuoteFilter[]
}

/**
 * Represents a filter used for querying quotations.
 *
 * @interface QuoteFilter
 *
 * @property {string} FilterName - The name of the filter to apply.
 * @property {string | boolean} FilterValue - The value of the filter. Can be a string or a boolean.
*/

export interface QuoteFilter {
  FilterName: string;
  FilterValue: string | boolean;
}
