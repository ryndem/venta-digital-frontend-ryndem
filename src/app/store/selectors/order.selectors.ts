import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectQuoteDetails = (id: string) => createSelector(
    selectOrderState,
    (state) => state.quotes.find(q => q.quotationDetails.idQuotation == id) || null
);

export const selectPurchaseOrderDetails = (id: string) => createSelector(
    selectOrderState,
    (state) => state.purchaseOrders.find(po => po.idPurchaseOrder == id) || null
);
export const selectConfirmedOrderDetails = (id: string) => createSelector(
    selectOrderState,
    (state) => state.confirmedOrders.find(co => co.idOrder == id) || null
);


export const selectConfirmedOrderItems = (orderId: string, quoteId: string) => createSelector(
    selectOrderState,
    (state) => state.confirmedOrderItems.find(coi => coi.confirmedOrderId == orderId && coi.quoteId == quoteId)?.items || null
);

export const selectPurchaseOrderItems = (purchaseOrderId: string, quoteId: string) => createSelector(
    selectOrderState,
    (state) => state.purchaseOrderItems.find(poi => poi.purchaseOrderId == purchaseOrderId && poi.quoteId == quoteId)?.items || null
);