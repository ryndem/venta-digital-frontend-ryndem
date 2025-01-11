import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as OrderActions from '../actions/order.actions';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuotesService } from 'app/services/quotes.service';


/**
 * Order effects to update order state
 * @export
 * @class OrderEffects
 */
@Injectable()
export class OrderEffects {

  /**
   * Creates an instance of CartEffects.
   * @param {Actions} actions$
   * @param {QuotesService} quotesService
   */
  constructor(
    private actions$: Actions,
    private quotesService: QuotesService,
  ) {}

  /**
   * Effect to load user cart
   */
  loadQuoteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadQuoteById),
      mergeMap((action) =>
        from(this.quotesService.getById(action.quoteId)).pipe(
          map((quote: ShoppingCart) => OrderActions.addLoadedQuote({quote: quote})),
          catchError(() => of({type: '[Order]loadQuoteById'}))
        )
      )
    )
  );

}
