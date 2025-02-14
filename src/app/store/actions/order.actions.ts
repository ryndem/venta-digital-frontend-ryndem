import { createAction, props } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderFile } from 'app/model/order-file';
import { OrderItem } from 'app/model/order-item';
import { PurchaseOrder } from 'app/model/purchase-order';
import { QuoteItem } from 'app/model/quote';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';


/**
 * Exports updateExpressFreight action
*/
export const updateExpressFreight = createAction(
  '[Order]updateExpressFreight',
  props<{
    quoteItemId: string,
    appliesFreightExpress: boolean,
    addressId: string,
    cartItems: QuoteProduct[]
  }>()
)

/**
 * Exports updateExpressFreightSuccess action
*/
export const updateExpressFreightSuccess = createAction(
  '[Order]updateExpressFreightSuccess'
);


/**
 * Exports submitShoppingCart action
*/
export const submitShoppingCart = createAction(
  '[Order]submitShoppingCart',
  props<{
    quoteId: string,
    addressId: string | null,
    cartItems: QuoteProduct[]
  }>()
)

/**
 * Exports loadQuoteById action
*/
export const loadQuoteById = createAction(
  '[Order]loadQuoteById',
  props<{ quoteId: string}>()
)

/**
 * Exports addLoadedQuote action
*/
export const addLoadedQuote = createAction(
  '[Order]addLoadedQuote',
  props<{ quote: ShoppingCart}>()
)

/**
 * Exports loadPurchaseOrderById action
*/
export const loadPurchaseOrderById = createAction(
  '[Order]loadPurchaseOrderById',
  props<{ purchaseOrderId: string }>()
)

/**
 * Exports addLoadedPurchaseOrder action
*/
export const addLoadedPurchaseOrder = createAction(
  '[Order]addLoadedPurchaseOrder',
  props<{ purchaseOrder: PurchaseOrder}>()
)


/**
 * Exports loadConfirmedOrderById action
*/
export const loadConfirmedOrderById = createAction(
  '[Order]loadConfirmedOrderById',
  props<{ confirmedOrderId: string }>()
)

/**
 * Exports addLoadedConfirmedOrder action
*/
export const addLoadedConfirmedOrder = createAction(
  '[Order]addLoadedConfirmedOrder',
  props<{ confirmedOrder: ConfirmedOrder}>()
)

/**
 * Exports loadPurchaseOrderItems action
*/
export const loadPurchaseOrderItems = createAction(
  '[Order]loadPurchaseOrderItems',
  props<{ purchaseOrderId: string, quoteId: string}>()
)


/**
 * Exports loadConfirmedOrderItems action
*/
export const loadConfirmedOrderItems = createAction(
  '[Order]loadConfirmedOrderItems',
  props<{ confirmedOrderId: string, quoteId: string}>()
)


/**
 * Exports addLoadedPurchaseOrderItems action
*/
export const addLoadedPurchaseOrderItems = createAction(
  '[Order]addLoadedPurchaseOrderItems',
  props<{ purchaseOrderId: string, quoteId: string, items: OrderItem[]}>()
)

/**
 * Exports addLoadedConfirmedOrderItems action
*/
export const addLoadedConfirmedOrderItems = createAction(
  '[Order]addLoadedConfirmedOrderItems',
  props<{ confirmedOrderId: string, quoteId: string, items: OrderItem[]}>()
)

/**
 * Exports uploadPurchaseOrderFile action
*/
export const uploadPurchaseOrderFile = createAction(
  '[Order]uploadPurchaseOrderFile',
  props<{ fileForm: FormData }>()
)

/**
 * Exports updateUploadedOrderFile action
*/
export const updateUploadedOrderFile = createAction(
  '[Order]updateUploadedOrderFile',
  props<{ orderFile: OrderFile | null }>()
)

/**
 * Exports updateOrderList action
*/
export const updateOrderList = createAction(
  '[Order]updateOrderList',
  props<{ orderList: QuoteItem[] | null }>()
)

/**
 * Exports updateIsLoadingOrders action
*/
export const updateIsLoadingOrders = createAction(
  '[Order]updateIsLoadingOrders',
  props<{ isLoadingOrders: boolean }>()
)

/**
 * Exports loadQuotes action
*/
export const loadQuotes = createAction(
  '[Order]loadQuotes',
  props<{ searchFilter: string, pageSize: number, page: number }>()
)

/**
 * Exports loadPurchaseOrders action
*/
export const loadPurchaseOrders = createAction(
  '[Order]loadPurchaseOrders',
  props<{ searchFilter: string, pageSize: number, page: number }>()
)

/**
 * Exports loadOrders action
*/
export const loadOrders = createAction(
  '[Order]loadOrders',
  props<{ searchFilter: string, isClosed: boolean }>()
)
