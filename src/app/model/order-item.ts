import { OrderItemStatusTrack } from "./order-item-track";

/**
 * Represents an item in an order, including product detail like pricing, and freight information.
 * @interface OrderItem
*/
export type OrderItem = {

  /**
   * The unique identifier for the quotation associated with the item.
   * @type {string}
   */
  idQuotation: string;

  /**
   * The unique identifier for the quotation item.
   * @type {string}
   */
  idQuotationItem: string;
  
  /**
   * The unique identifier for the product, if applicable.
   * @type {(string | null)}
   */
  idProduct: string | null;

  /**
   * Indicates whether the item is included in the purchase order.
   * @type {boolean}
   */
  inPurchaseOrder: boolean;

  /**
   * Indicates whether the item is associated with a folio purchase order.
   * @type {boolean}
   */
  folioPurchaseOrder: boolean;

  /**
   * The line number or sequence number of the item in the order.
   * @type {number}
   */
  number: number;

  /**
   * The CAS (Chemical Abstracts Service) registry number for the product.
   * @type {string}
   */
  cas: string;

  /**
   * The catalog to which the product belongs.
   * @type {string}
   */
  catalog: string;

  /**
   * The type or category of the product.
   * @type {string}
   */
  type: string;

  /**
   * The key representing the product type.
   * @type {string}
   */
  typeKey: string;

  /**
   * The name of the brand associated with the product, if applicable.
   * @type {(string | null)}
   */
  brandName: string | null;

  /**
   * The key representing the product's presentation type, if applicable.
   * @type {(string | null)}
   */
  presentationTypeKey: string | null;

  /**
   * A brief description of the product.
   * @type {string}
   */
  description: string;

  /**
   * The unit of measurement for the product.
   * @type {string}
   */
  unit: string;

  /**
   * The quantity of the product ordered.
   * @type {number}
   */
  numberOfPieces: number;

  /**
   * The price per unit of the product.
   * @type {number}
   */
  unitPrice: number;

  /**
   * The price per unit of the product when the user is not logged
   * @type {number}
   */
  webPrice: number;

  /**
   * The total estimated time in days to send the product associated with the quotation item.
   * @type {number}
   */
  tee: number;

  /**
   * Indicates whether the product is a controlled item.
   * @type {boolean}
   */
  controlled: boolean;

  /**
   * Last update date of the order item.
   * @type {string}
   */
  lastUpdateDate: string;

  /**
   * List of item status updates.
   * @type {OrderItemStatusTrack[]}
   */
  itemTracking: OrderItemStatusTrack[];
  

  /**
   * Indicates whether express freight applies to the item.
   * @type {boolean}
   */
  appliesExpressFreight: boolean;

  /**
   * Indicates whether freight express applies to the item.
   * @type {boolean}
   */
  appliesFreightExpress: boolean;

  /**
   * The total price for the item, considering the quantity and unit price.
   * @type {number}
   */
  totalPrice: number;

  /**
   * Indicates whether express freight is available for the item.
   * @type {boolean}
   */
  expressFreightAvailable: boolean;

  /**
   * Order Item tracking status label
   * @type {string}
   */
    tracking: string;

  /**
   * Order Item tracking status key
   * @type {string}
   */
  key: string;
};
