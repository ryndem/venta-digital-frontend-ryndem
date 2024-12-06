/**
 * Represents an offer or pricing details for a product.
 *
 * @interface Offert
 *
 * @property {number} pieces - The number of pieces in the offer.
 * @property {number} unitPrice - The price per unit in the offer.
 * @property {number} unitPriceWeb - The price per unit for logged customers.
 * @property {string} deliveryTime - The delivery time in text for the offer.
 * @property {number} deliveryTimeDays - The delivery time in days.
 * @property {Date} deliveryTimeDate - The exact delivery date for the offer.
 * @property {boolean} appliesPerPiece - Indicates whether the offer applies to individual pieces (When quoting this product, its unit price changes each time the number of pieces changes).
 * @property {string} idDeliveryAddress - The unique identifier for the delivery address.
*/

export type Offert = {
  pieces: number;
  unitPrice: number;
  unitPriceWeb: number;
  deliveryTime: string;
  deliveryTimeDays: number;
  deliveryTimeDate: Date;
  appliesPerPiece: boolean;
  idDeliveryAddress: string;
};
