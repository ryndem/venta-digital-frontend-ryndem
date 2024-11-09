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
  offert: offert;
  unit?: string;
  transportHandling?: string;
  storageHandling?: string;
  purity?: string;
  mediaOutlet: string | null;
  trainingProductDescription: string | null;
  publicationFormat: string | null;
  author: string | null;

  // All these are missing to confirm
  publicPrice?: number;
  userPrice?: number;
  unitMeasure?: number;
  category?: string;
  cat?: string;
};
