import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as CartActions from '../actions/cart.actions';
import { CartService } from 'app/services/cart.service';
import { ShoppingCart } from 'app/model/shopping-cart';


/**
 * Cart effects to update cart state
 * @export
 * @class CartEffects
 */
@Injectable()
export class CartEffects {

  /**
   * Creates an instance of CartEffects.
   * @param {Actions} actions$
   * @param {CartService} cartService
   */
  constructor(
    private actions$: Actions,
    private cartService: CartService,
  ) {}

  /**
   * Effect to load user cart
   */
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() =>
        from(this.cartService.getShoppingCart()).pipe(
          map((cart: ShoppingCart) => {
            this.cartService.setCart(cart);
            return CartActions.updateCart({shoppingCart: cart});
          }),
          catchError(() => of(CartActions.updateCart({shoppingCart: null})))
        )
      )
    )
  );

  /**
   * Effect to add product to cart
   */
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      mergeMap((action) =>
        from(this.cartService.addProduct(action.product, action.quantity)).pipe(
          mergeMap(() => of({ type: '[Cart]addProductToCart' })),
          catchError(() => of({ type: '[Cart]addProductToCartFailure' }))
        )
      )
    )
  );

  /**
   * Effect to re add product to cart
   */
  reAddProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.reAddProductToCart),
      mergeMap((action) =>
        from(this.cartService.reAddProduct(action.product)).pipe(
          mergeMap(() => of({ type: '[Cart]reAddProductToCart' })),
          catchError(() => of({ type: '[Cart]reAddProductToCartFailure' }))
        )
      )
    )
  );

  /**
   * Effect to update product quantity on cart
   */
  updateProductQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateProductQuantity),
      debounceTime(300),
      mergeMap((action) =>
        from(this.cartService.updateQuantity(action.quoteItemId, action.quantity)).pipe(
          mergeMap(() => of({ type: '[Cart]updateProductQuantity' })),
          catchError(() => of({ type: '[Cart]updateProductQuantityFailure' }))
        )
      )
    )
  );

  /**
   * Effect to remove product from cart
   */
  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeProductFromCart),
      mergeMap((action) =>
        from(this.cartService.updateQuantity(action.quoteItemId, 0)).pipe(
          mergeMap(() => of({ type: '[Cart]removeProductFromCart' })),
          catchError(() => of({ type: '[Cart]removeProductFromCartFailure' }))
        )
      )
    )
  );

  /**
   * Effect to Address from cart
   */
  updateCartShippingAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartShippingAddress),
      mergeMap((action) =>
        from(this.cartService.updateShippingAddress(action.addressId)).pipe(
          mergeMap(() => of({ type: '[Cart]updateCartShippingAddress' })),
          catchError(() => of({ type: '[Cart]updateCartShippingAddressFailure' }))
        )
      )
    )
  );

}
