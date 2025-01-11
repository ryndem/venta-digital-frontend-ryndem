import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectQuoteDetails = (id: string) => createSelector(
    selectOrderState,
    (state) => state.quotes.find(q => q.quotationDetails.idQuotation == id) || null
);
