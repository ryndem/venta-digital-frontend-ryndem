/**
 * Represents a product included in a quotation, with detailed pricing, freight, and product information.
 *
 * @interface QuoteProduct
 *
 * @property {string} idQuotation - The unique identifier for the quotation.
 * @property {string} idQuotationItem - The unique identifier for the quotation item.
 * @property {string | null} idProduct - The unique identifier for the product, if applicable.
 * @property {boolean} inPurchaseOrder - Indicates whether the product is included in the purchase order.
 * @property {boolean} folioPurchaseOrder - Indicates whether the product is associated with a folio purchase order.
 * @property {number} number - The sequence number of the product in the quotation.
 * @property {string} cas - The CAS (Chemical Abstracts Service) registry number of the product.
 * @property {string} catalog - The catalog to which the product belongs.
 * @property {string} type - The type or category of the product.
 * @property {string} typeKey - The key representing the product type.
 * @property {string | null} brandName - The brand name of the product, if applicable.
 * @property {string | null} presentationTypeKey - The key representing the product's presentation type, if applicable.
 * @property {string} description - A brief description of the product.
 * @property {string} unitMeasure - The unit of measurement for the product.
 * @property {number} quantity - The quantity of the product included in the quotation.
 * @property {number} unitPrice - The price per unit of the product.
 * @property {number} webPrice - The price per unit of the product for the logged user.
 * @property {number} tee - The total estimated time to send the product associated with the quotation item.
 * @property {boolean} controlled - Indicates whether the product is a controlled item.
 * @property {boolean} appliesExpressFreight - Indicates whether express freight applies to the product.
 * @property {boolean} appliesFreightExpress - Indicates whether freight express applies to the product.
 * @property {number} totalPrice - The total price for the product, considering its quantity and unit price.
 * @property {boolean} expressFreightAvailable - Indicates whether express freight is available for the product.
*/

export type QuoteProduct = {
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
  unitMeasure: string;
  quantity: number;
  unitPrice: number;
  webPrice: number;
  tee: number;
  controlled: boolean;

  appliesExpressFreight: boolean;
  appliesFreightExpress: boolean;
  totalPrice: number;
  expressFreightAvailable: boolean;
};
