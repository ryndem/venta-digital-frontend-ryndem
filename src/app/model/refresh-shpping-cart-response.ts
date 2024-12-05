import { ListQuotationRefreshResponse } from "./list-quotation-refresh-response";

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