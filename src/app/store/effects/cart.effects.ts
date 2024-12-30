import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
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
  constructor(private actions$: Actions, private cartService: CartService) {}

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
          catchError(() => {
            return of(CartActions.updateCart({shoppingCart: null}))
          })
        )
      )
    )
  );
}
