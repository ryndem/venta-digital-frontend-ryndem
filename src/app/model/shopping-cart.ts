import { QuoteDetails } from "./quote-details";
import { QuoteProduct } from "./quote-product";

/**
 * Represents the structure of a shopping cart, including quotation details, products, and optional freight information.
 *
 * @interface ShoppingCart
 *
 * @property {QuoteDetails} quotationDetails - Detailed information about the associated quotation.
 * @property {QuoteProduct[]} listQuotationItem - A list of products included in the shopping cart.
 * @property {{ amount: number; itemCount: number; } | undefined} freightExpressDetails (Optional) - Details about express freight charges and the number of items included, if applicable.
 * @property {{ amount: number; itemCount: number; } | undefined} freightOutsiderDetails (Optional) - Details about outside freight charges and the number of items included, if applicable.
*/

export type ShoppingCart = {
  quotationDetails: QuoteDetails;
  listQuotationItem: QuoteProduct[];
  freightExpressDetails?: {
    amount: number;
    itemCount: number;
  };
  freightOutsiderDetails?: {
    amount: number;
    itemCount: number;
  }
};
