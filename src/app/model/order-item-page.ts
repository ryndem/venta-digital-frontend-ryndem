import { OrderItem } from "./order-item";

/**
 * Represents a paginated list of order items.
 *
 * @interface OrderItemPage
 *
 * @property {number} totalResults - The total number of order items available across all pages.
 * @property {OrderItem[]} results - An array of order items on the current page.
 */

export type OrderItemPage = {
  totalResults: number;
  results: OrderItem[];
};
