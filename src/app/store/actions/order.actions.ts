import { createAction, props } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';

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
