import { ListQuotationRefreshResponse } from "./list-quotation-refresh-response";

/**
 * Represents the response for refreshing the shopping cart with updated totals, taxes, and quotation items.
 *
 * @interface RefreshShoppingCartResponse
 *
 * @property {string} idQuotation - The unique identifier for the quotation.
 * @property {number} saleTax - The total sales tax (IVA) for the shopping cart.
 * @property {number} subtotal - The subtotal amount for the shopping cart before taxes and freight.
 * @property {number} total - The total amount for the shopping cart, including taxes and freight.
 * @property {ListQuotationRefreshResponse[]} listquotationItemRefreshResponses - A list of refreshed quotation items with updated quantities and prices.
 * @property {{ amount: number; itemCount: number; }} freightExpressDetails - Details about express freight charges and item counts.
 * @property {{ amount: number; itemCount: number; }} freightOutsiderDetails - Details about outside freight charges and item counts.
*/

export type RefreshShoppingCartResponse = {
  idQuotation: string;
  saleTax: number;
  subtotal: number;
  total: number;
  listquotationItemRefreshResponses: ListQuotationRefreshResponse[];
  freightExpressDetails: {
    amount: number;
    itemCount: number;
  };
  freightOutsiderDetails: {
    amount: number;
    itemCount: number;
  }
}
