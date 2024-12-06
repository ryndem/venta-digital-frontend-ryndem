/**
 * Represents the detailed information of a quotation.
 *
 * @interface QuoteDetails
 *
 * @property {string} idQuotation - The unique identifier for the quotation.
 * @property {string} folio - The folio number associated with the quotation.
 * @property {string} idCustomer - The unique identifier of the customer associated with the quotation.
 * @property {string} idUser - The unique identifier of the user who created the quotation.
 * @property {string} idfilePdf - The unique identifier for the PDF file associated with the quotation.
 * @property {string} paymentTerms - The payment terms for the quotation.
 * @property {string} address - The user address associated with the quotation.
 * @property {string} expirationDate - The expiration date of the quotation in ISO format.
 * @property {string} registrationDate - The date the quotation was registered in ISO format.
 * @property {string} currency - The currency used in the quotation.
 * @property {boolean} active - Indicates whether the quotation is currently active.
 * @property {number} saleTax - The sales tax amount applied to the quotation.
 * @property {number} subtotal - The subtotal amount for the quotation, before taxes.
 * @property {number} total - The total amount of the quotation, including taxes.
 */

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
