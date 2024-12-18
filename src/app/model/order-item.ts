/**
 * Represents an item in an order, including product detail like pricing, and freight information.
 *
 * @interface OrderItem
 *
 * @property {string} idQuotation - The unique identifier for the quotation associated with the item.
 * @property {string} idQuotationItem - The unique identifier for the quotation item.
 * @property {string | null} idProduct - The unique identifier for the product, if applicable.
 * @property {boolean} inPurchaseOrder - Indicates whether the item is included in the purchase order.
 * @property {boolean} folioPurchaseOrder - Indicates whether the item is associated with a folio purchase order.
 * @property {number} number - The line number or sequence number of the item in the order.
 * @property {string} cas - The CAS (Chemical Abstracts Service) registry number for the product.
 * @property {string} catalog - The catalog to which the product belongs.
 * @property {string} type - The type or category of the product.
 * @property {string} typeKey - The key representing the product type.
 * @property {string | null} brandName - The name of the brand associated with the product, if applicable.
 * @property {string | null} presentationTypeKey - The key representing the product's presentation type, if applicable.
 * @property {string} description - A brief description of the product.
 * @property {string} unit - The unit of measurement for the product.
 * @property {number} numberOfPieces - The quantity of the product ordered.
 * @property {number} unitPrice - The price per unit of the product.
 * @property {number} webPrice - The price per unit of the product when the user is not logged
 * @property {number} tee - The total estimated time in days to send the product associated with the quotation item.
 * @property {boolean} controlled - Indicates whether the product is a controlled item.
 * @property {string} - Last update date of the order item.
 * @property {OrderItemStatusTrack[]} itemTracking - List of item status updates.
 * 
 * @property {boolean} appliesExpressFreight - Indicates whether express freight applies to the item.
 * @property {boolean} appliesFreightExpress - Indicates whether freight express applies to the item.
 * @property {number} totalPrice - The total price for the item, considering the quantity and unit price.
 * @property {boolean} expressFreightAvailable - Indicates whether express freight is available for the item.
*/

import { OrderItemStatusTrack } from "./order-item-track";

export type OrderItem = {
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
  unit: string;
  numberOfPieces: number;
  unitPrice: number;
  webPrice: number;
  tee: number;
  controlled: boolean;
  lastUpdateDate: string;
  itemTracking: OrderItemStatusTrack[];
  

  //TODO: Remove one of these once the API is fixed
  appliesExpressFreight: boolean;
  appliesFreightExpress: boolean;
  totalPrice: number;
  expressFreightAvailable: boolean;
};
