/**
 * Represents the properties for searching products, including pagination, sorting, and filtering options.
 *
 * @interface SearchProductProps
 *
 * @property {number} pageSize - The number of items to display per page.
 * @property {number} desiredPage - The page number to retrieve.
 * @property {string | undefined} sortField (Optional) - The field name to sort the results by.
 * @property {string | undefined} sortDirection (Optional) - The direction of the sort, "ASC" or "DESC".
 * @property {Array<{ filterName?: string; filterValue?: string; }> | undefined} filters (Optional) - A list of filters to apply to the search. @example brandName or CAS or category.
 * @property {Array<{ fieldName?: string; suggestionValue?: string; }> | undefined} suggestions (Optional) - A list of suggestion parameters to refine the search. Each suggestion may include a field name and value.
 */

export type SearchProductProps = {
  pageSize: number;
  desiredPage: number;
  sortField?: string;
  sortDirection?: string;
  filters?: [
    {
      filterName?: string;
      filterValue?: string;
    },
  ];
  suggestions?: [
    {
      fieldName?: string;
      suggestionValue?: string;
    },
  ];
};
