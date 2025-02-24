
/**
 * Represents the values stored on the OrderState Store
 * @interface OrderState
 */

import { ConfirmedOrder } from "app/model/confirmed-order";
import { OrderFile } from "app/model/order-file";
import { OrderItem } from "app/model/order-item";
import { PurchaseOrder } from "app/model/purchase-order";
import { QuoteItem } from "app/model/quote";
import { ShoppingCart } from "app/model/shopping-cart";

export interface OrderState {

    /**
     * Indicates if the user information is already loaded
     * @type {boolean}
     */
    quotes: ShoppingCart[];
    purchaseOrders: PurchaseOrder[];
    confirmedOrders: ConfirmedOrder[];

    purchaseOrderItems: Array<{
          purchaseOrderId: string;
          quoteId: string;
          items: OrderItem[];
        }>;
    confirmedOrderItems: Array<{
        confirmedOrderId: string;
        quoteId: string;
        items: OrderItem[];
      }>;

    uploadedOrderFile: OrderFile | null; 

    orderList: QuoteItem[] | null;
    isLoadingOrders: boolean;
}

/**
 * Specify initial state for OrderState
 */
export const initialOrderState: OrderState = {
    quotes: [],
    purchaseOrderItems: [],
    confirmedOrderItems: [],
    purchaseOrders: [],
    confirmedOrders: [],
    uploadedOrderFile: null,
    orderList: null,
    isLoadingOrders: false,
};

