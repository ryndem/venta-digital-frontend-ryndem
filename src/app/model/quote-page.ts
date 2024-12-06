import { Quote } from "./quote";

/**
 * Represents a paginated list of quotes.
 *
 * @interface QuotePage
 *
 * @property {number} totalResults - The total number of quotes  available across all pages.
 * @property {Quote[]} results - An array of quotes on the current page.
*/

export type QuotePage = {
  totalResults: number;
  results: Quote[];
};
