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
);
