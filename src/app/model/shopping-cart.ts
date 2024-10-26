import { QuoteDetails } from "./quote-details";
import { QuoteProduct } from "./quote-product";

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
