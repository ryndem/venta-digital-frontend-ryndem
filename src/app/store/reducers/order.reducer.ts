import { createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { initialOrderState } from '../states/order.state';

/**
 * Reducer for OrderState actions
 */
export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.addLoadedQuote, (state, { quote }) => {
    const quotes = [...state.quotes];
    const index = quotes.findIndex( q => q.quotationDetails.idQuotation == quote.quotationDetails.idQuotation);

    if(index >= 0) {
      quotes[index] = quote;
    } else {
      quotes.push(quote);
    }

    return ({
      ...state,
      quotes: quotes
    })
  }),
  on(OrderActions.addLoadedPurchaseOrder, (state, { purchaseOrder }) => {
    const purchaseOrders = [...state.purchaseOrders];
    const index = purchaseOrders.findIndex( po => po.idPurchaseOrder == purchaseOrder.idPurchaseOrder);

    if(index >= 0) {
      purchaseOrders[index] = purchaseOrder;
    } else {
      purchaseOrders.push(purchaseOrder);
    }

    return ({
      ...state,
      purchaseOrders: purchaseOrders
    })
  }),

  on(OrderActions.addLoadedConfirmedOrder, (state, { confirmedOrder }) => {
    const confirmedOrders = [...state.confirmedOrders];
    const index = confirmedOrders.findIndex( co => co.idOrder == confirmedOrder.idOrder);

    if(index >= 0) {
      confirmedOrders[index] = confirmedOrder;
    } else {
      confirmedOrders.push(confirmedOrder);
    }

    return ({
      ...state,
      confirmedOrders: confirmedOrders
    })
  }),

  on(OrderActions.addLoadedPurchaseOrderItems, (state, { purchaseOrderId, quoteId, items }) => {
    const purchaseOrderItems = [...state.purchaseOrderItems];
    const index = purchaseOrderItems.findIndex( i => i.purchaseOrderId == purchaseOrderId && i.quoteId == quoteId);

    if(index >= 0) {
      purchaseOrderItems[index] = {
        ...purchaseOrderItems[index],
        items: items
      };
    } else {
      purchaseOrderItems.push({
        purchaseOrderId,
        quoteId,
        items
      });
    }

    return ({
      ...state,
      purchaseOrderItems: purchaseOrderItems
    })
  }),

  on(OrderActions.addLoadedConfirmedOrderItems, (state, { confirmedOrderId, quoteId, items }) => {
    const confirmedOrderItems = [...state.confirmedOrderItems];
    const index = confirmedOrderItems.findIndex( i => i.confirmedOrderId == confirmedOrderId && i.quoteId == quoteId);

    if(index >= 0) {
      confirmedOrderItems[index] = {
        ...confirmedOrderItems[index],
        items: items
      };
    } else {
      confirmedOrderItems.push({
        confirmedOrderId,
        quoteId,
        items
      });
    }

    return ({
      ...state,
      confirmedOrderItems: confirmedOrderItems
    })
  }),

);


