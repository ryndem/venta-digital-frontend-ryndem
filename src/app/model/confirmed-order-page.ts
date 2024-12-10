import { ConfirmedOrderItem } from "./confirmed-order";

/**
 * Represents a paginated list of confirmed orders.
 *
 * @interface ConfirmedOrderPage
 *
 * @property {number} totalResults - The total number of confirmed orders available across all pages.
 * @property {ConfirmedOrderItem[]} results - An array of confirmed order on the current page.
*/

export type ConfirmedOrderPage = {
  totalResults: number;
  results: ConfirmedOrderItem[];
};
