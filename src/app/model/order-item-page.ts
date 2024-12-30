import { OrderItem } from "./order-item";

/**
 * Represents a paginated list of order items.
 * @interface OrderItemPage
 */

export type OrderItemPage = {

  /**
   * The total number of order items available across all pages.
   * @type {number}
   */
  totalResults: number;

  /**
   * An array of order items on the current page.
   * @type {OrderItem[]}
   */
  results: OrderItem[];
};
