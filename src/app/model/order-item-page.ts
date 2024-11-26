import { OrderItem } from "./order-item";

export type OrderItemPage = {
  totalResults: number;
  results: OrderItem[];
};