import { Quote } from "./quote";

export type ConfirmedOrder = {
  idOrder: string;

  folio: string;
  address: string;
  idPurchaseOrderFile: string;
  itemCount: number;
  subtotal: number;
  saleTax: number;
  total: number;
  registrationDate: string;
  listQuotation: Quote[];
  freightExpressDetails: {
    amount: number;
    itemCount: number;
  },
  freightOutsiderDetails: {
    amount: number;
    itemCount: number;
  }
  
}
