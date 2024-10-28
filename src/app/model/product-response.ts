import { Product } from "./product";

export type ProductResponse = {
  totalResults: number;
  results: Product[];
};