import { createAction, props } from '@ngrx/store';
import { Product } from 'app/model/product';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';


/**
 * Exports loadCart action
 */
export const loadCart = createAction(
  '[Cart]loadCart'
);

/**
 * Exports updateCart action
 */
export const updateCart = createAction(
  '[Cart]updateCart',
  props<{ shoppingCart: ShoppingCart | null }>()
);

/**
 * Exports updateCartIsLoading action
 */
export const updateCartIsLoading = createAction(
  '[Cart]updateCartIsLoading',
  props<{ isLoading: boolean }>()
);

/**
 * Exports addProductToCart action
 */
export const addProductToCart = createAction(
  '[Cart]addProductToCart',
  props<{ product: Product, quantity: number }>()
);

/**
 * Exports reAddProductToCart action
 */
export const reAddProductToCart = createAction(
  '[Cart]reAddProductToCart',
  props<{ product: QuoteProduct }>()
);

/** 
 * Exports updateProductQuantity action
*/
export const updateProductQuantity = createAction(
  '[Cart]updateProductQuantity',
  props<{ quoteItemId: string, quantity: number}>()
)

/** 
 * Exports deleteProductFromCart action
*/
export const removeProductFromCart = createAction(
  '[Cart]removeProductFromCart',
  props<{ quoteItemId: string}>()
)

/** 
 * Exports updateCartShippingAddress action
*/
export const updateCartShippingAddress = createAction(
  '[Cart]updateCartShippingAddress',
  props<{ addressId: string}>()
)


/** 
 * Exports submitShoppingCart action
*/
export const submitShoppingCart = createAction(
  '[Cart]submitShoppingCart',
  props<{ quoteId: string, addressId: string | null, cartItems: QuoteProduct[] }>()
)
