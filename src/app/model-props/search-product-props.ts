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