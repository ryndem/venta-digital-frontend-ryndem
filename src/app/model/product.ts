import { Offert } from './offert';

/**
 * Represents the details of a product available in the catalog.
 *
 * @interface Product
 *
 * @property {string} idProduct - The unique identifier for the product.
 * @property {boolean} hasCAS (Optional)- Indicates whether the product has a CAS (Chemical Abstracts Service) registry number.
 * @property {string | undefined} cas (Optional) - The CAS number of the product, if applicable.
 * @property {string | undefined} atc (Optional) - The ATC (Anatomical Therapeutic Chemical) classification code of the product, if applicable.
 * @property {string} catalog - The catalog to which the product belongs.
 * @property {string} description - A  description of the product.
 * @property {string} presentationType - The type of presentation for the product.
 * @property {string} presentationTypeKey - The key representing the product's presentation type.
 * @property {string} presentation - Details about the product's presentation.
 * @property {string | null} isbn - The ISBN (International Standard Book Number), if applicable.
 * @property {string} brandImageName - The name of the brand's associated image.
 * @property {string} type - The type or category of the product.
 * @property {string} typeKey - The key representing the product's type.
 * @property {string} brandName - The name of the product's brand.
 * @property {boolean} hasExpressFreight - Indicates whether express freight is available for the product.
 * @property {boolean} hasStock - Indicates whether the product is in stock.
 * @property {boolean} aboutToExpire - Indicates whether the product is close to its expiration date.
 * @property {number} existingStockQuantity - The quantity of stock available for the product, if applicable.
 * @property {Date} stockExpirationDate - The expiration date of the available stock, if applicable.
 * @property {number} estimatedDeliveryTimeStock - The estimated delivery time in days for the stock, if applicable.
 * @property {boolean} controlled - Indicates whether the product is controlled or not.
 * @property {Offert} offert - The current offer or pricing details for the product.
 * @property {string | undefined} unit (Optional) - The unit of measurement for the product.
 * @property {string | undefined} transportHandling (Optional) - Instructions for transporting the product.
 * @property {string | undefined} storageHandling (Optional) - Instructions for storing the product.
 * @property {string | undefined} purity (Optional) - The purity level of the product, if applicable.
 * @property {string | null} mediaOutlet - Media outlet associated with the product, if applicable.
 * @property {string | null} trainingProductDescription - A description of the product for training products, if applicable.
 * @property {string | null} publicationFormat - The format of publication for the product, if applicable.
 * @property {string | null} author - The author of the product, if applicable.
 * @property {number | undefined} unitMeasure (Optional) - The unit measure for the product.
 */

export type Product = {
  idProduct: string;
  hasCAS?: boolean;
  cas?: string;
  atc?: string;
  catalog: string;
  description: string;
  presentationType?: string;
  presentationTypeKey?: string;
  presentation: string;
  isbn: string | null;
  brandImageName: string;
  type: string;
  typeKey: string;
  brandName: string;
  hasExpressFreight: boolean;
  hasStock: boolean;
  aboutToExpire: boolean;
  existingStockQuantity?: number;
  stockExpirationDate?: Date;
  estimatedDeliveryTimeStock?: number;
  controlled: boolean;
  offert: Offert;
  unit?: string;
  transportHandling?: string;
  storageHandling?: string;
  purity?: string;
  mediaOutlet: string | null;
  trainingProductDescription: string | null;
  publicationFormat: string | null;
  author: string | null;
  unitMeasure?: number;
};
