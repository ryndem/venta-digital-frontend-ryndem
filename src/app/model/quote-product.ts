export type QuoteProduct = {
  idQuotation: string;
  idQuotationItem: string;
  idProduct: string | null;
  inPurchaseOrder: boolean;
  folioPurchaseOrder: boolean;
  number: number;
  cas: string;
  catalog: string;
  type: string;
  typeKey: string;
  brandName: string | null;
  presentationTypeKey: string | null;
  description: string;
  unitMeasure: string;
  quantity: number;
  unitPrice: number;
  webPrice: number;
  tee: number;
  controlled: boolean;
  //TODO: Remove one of these once the API is fixed
  appliesExpressFreight: boolean;
  appliesFreightExpress: boolean;
  totalPrice: number;
  expressFreightAvailable: boolean;
};
