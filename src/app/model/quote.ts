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
  idfilePdf: string;
  expirationDate: string;
  registrationDate: string;
  items: number;
  total: number;
  isValid: boolean;
};

/**
 * Represents an individual quotation item with details about its metadata and status.
 *
 * @interface QuoteItem
 *
 * @property {string} id - The unique identifier for the quotation.
 * @property {string} folio - The folio number associated with the quotation.
 * @property {string} registrationDate - The date the quotation was registered, in ISO format.
 * @property {number} items - The total number of items included in the quotation.
 * @property {number} total - The total amount for the quotation, including all items and taxes.
 * @property {string | undefined} expirationDate (Optional) - The date the quotation expires, in ISO format, if applicable.
 * @property {boolean | undefined} isValid (Optional) - Indicates whether the quotation is still valid, if applicable.
*/

export type QuoteItem = {
  id: string;
  folio: string;
  registrationDate: string;
  items: number;
  total: number;
  expirationDate?: string;
  isValid?: boolean;
}
