import { createAction, props } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
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

