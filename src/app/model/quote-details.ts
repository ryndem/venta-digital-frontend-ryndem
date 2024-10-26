export type QuoteDetails = {
  idQuotation: string;
  folio: string;
  idCustomer: string;
  idUser: string;
  idfilePdf: string;
  paymentTerms: string;
  address: string;
  expirationDate: string;
  registrationDate: string;
  currency: string;
  active: boolean;
  saleTax: number;
  subtotal: number;
  total: number;
};