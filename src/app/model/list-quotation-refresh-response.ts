/**
 * Represents the response for refreshing a list of quotation items with updated quantities and pricing.
 *
 * @interface ListQuotationRefreshResponse
 *
 * @property {string} idQuotationItem - The unique identifier for the quotation item.
 * @property {number} quantity - The updated quantity for the quotation item.
 * @property {number} totalPrice - The total price for the updated quantity of the quotation item.
 * @property {number} tee - The total estimated time to send the product associated with the quotation item.
*/

export type ListQuotationRefreshResponse = {
  idQuotationItem: string;
  quantity: number;
  totalPrice: number;
  tee: number;
}
