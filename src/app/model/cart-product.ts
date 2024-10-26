import { Product } from './product';

export type CartProduct = {
  quantity: number;
  product: Product;
  alternatives: Product[] | null;
  complementaries: Product[] | null;
};
