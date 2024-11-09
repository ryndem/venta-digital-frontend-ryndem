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

export type ListQuotationRefreshResponse = {
  idQuotationItem: string;
  quantity: number;
  totalPrice: number;
  tee: number;
}
