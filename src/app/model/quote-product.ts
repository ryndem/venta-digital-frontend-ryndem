export type QuoteProduct = {
  idQuotation: string;
  idQuotationItem: string;
  inPurchaseOrder: boolean;
  folioPurchaseOrder: boolean;
  number: number;
  cas: string;
  catalog: string;
  type: string;
  description: string;
  unitMeasure: string;
  quantity: number;
  unitPrice: number;
  webPrice: number;
  tee: number;
  appliesExpressFreight: boolean;
  totalPrice: number;
  expressFreightAvailable: boolean;
};