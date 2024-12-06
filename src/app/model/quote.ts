/**
 * Represents a quotation with details about its validity, items, and total amount.
 *
 * @interface Quote
 *
 * @property {string} idQuotation - The unique identifier for the quotation.
 * @property {string} folio - The folio number of the quotation.
 * @property {string} expirationDate - The expiration date of the quotation in ISO format.
 * @property {string} registrationDate - The date the quotation was registered in ISO format.
 * @property {number} items - The number of items in the quotation.
 * @property {number} total - The total value of the quotation.
 * @property {boolean} isValid - Indicates whether the quotation is still valid.
*/

export type Quote = {
  idQuotation: string;
  folio: string;
  expirationDate: string;
  registrationDate: string;
  items: number;
  total: number;
  isValid: boolean;
};
