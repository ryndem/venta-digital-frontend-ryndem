import { offert } from './offert';

export type Product = {
  // Properties from ProductWeb
  idProduct: string;
  hasCAS?: boolean;
  cas?: string;
  atc?: string;
  catalog: string;
  description: string;
  presentationType?: string;
  presentationTypeKey?: string;
  presentation: string;
  isbn?: string;
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
  offert: offert;
  unit?: string;
  transportHandling?: string;
  storageHandling?: string;
  purity?: string;

  // All these are missing to confirm
  publicPrice?: number;
  userPrice?: number;
  unitMeasure?: number;
  category?: string;
  cat?: string;
};
