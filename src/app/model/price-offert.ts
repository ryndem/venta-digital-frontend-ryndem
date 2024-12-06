/**
 * Represents the pricing and stock details of an offer.
 *
 * @interface PriceOffert
 *
 * @property {number} unitPrice - The price per unit of the product.
 * @property {boolean} hasStock - Indicates whether the product is currently in stock.
 * @property {string | null} stockDeliveryTime (Optional) - The estimated delivery time for the stock in string format, if available.
 * @property {number | null} stockDeliveryTimeDays (Optional) - The estimated delivery time for the stock in days, if available.
 */

export type PriceOffert = {
  unitPrice: number;
  hasStock: boolean;
  stockDeliveryTime: string | null;
  stockDeliveryTimeDays: number | null;
};
