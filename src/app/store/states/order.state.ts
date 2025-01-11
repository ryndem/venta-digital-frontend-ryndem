
/**
 * Represents the values stored on the OrderState Store
 * @interface OrderState
 */

import { ConfirmedOrder } from "app/model/confirmed-order";
import { PurchaseOrder } from "app/model/purchase-order";
import { ShoppingCart } from "app/model/shopping-cart";

export interface OrderState {

    /**
     * Indicates if the user information is already loaded
     * @type {boolean}
     */
    quotes: ShoppingCart[];
    purchaseOrders: PurchaseOrder[];
    confirmedOrders: ConfirmedOrder[];
}

/**
 * Specify initial state for OrderState
 */
export const initialOrderState: OrderState = {
    quotes: [],
    purchaseOrders: [],
    confirmedOrders: [],
};

