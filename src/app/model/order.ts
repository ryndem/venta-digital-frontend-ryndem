export type Order = {
  idPurchaseOrder: string;
  folio: string;
  address: string;
  idPurchaseOrderFile: string;
  itemCount: number;
  subtotal: number;
  saleTax: number;
  total: number;
  registrationDate: string;
  freightExpressDetails: {
    amount: number;
    itemCount: number;
  },
  freightOutsiderDetails: {
    amount: number;
    itemCount: number;
  }
}
