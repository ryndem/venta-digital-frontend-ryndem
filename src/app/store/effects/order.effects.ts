import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, throttleTime } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as OrderActions from '../actions/order.actions';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuotesService } from 'app/services/quotes.service';
import { CartService } from 'app/services/cart.service';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderService } from 'app/services/order.service';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { FileService } from 'app/services/file.service';


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
   * * @param {PurchaseOrderService} purchaseOrderService
   * * @param {OrderService} orderService
   * * @param {CartService} cartService
   * * @param {FileService} fileService
   */
  constructor(
    private actions$: Actions,
    private quotesService: QuotesService,
    private purchaseOrderService: PurchaseOrderService,
    private orderService: OrderService,
    private cartService: CartService,
    private fileService: FileService,
  ) {}

  /**
   * Effect to update express freight cart
   */
  updateExpressFreight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateExpressFreight),
      mergeMap((action) =>
        from(this.cartService.updateFreightExpress(
              action.quoteItemId,
              action.appliesFreightExpress,
              action.addressId,
              action.cartItems,
            )).pipe(
          mergeMap(() => of({type:'[Order]updateExpressFreightSuccess'})),
          catchError(() => of({type: '[Order]updateExpressFreightFailure'}))
        )
      )
    )
  );

  /**
   * Effect to update quote details
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

  /**
   * Effect to update purchase order details
   */
  loadPurchaseOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadPurchaseOrderById),
      mergeMap((action) =>
        from(this.purchaseOrderService.getById(action.purchaseOrderId)).pipe(
          map((purchaseOrder: PurchaseOrder) => OrderActions.addLoadedPurchaseOrder({purchaseOrder: purchaseOrder})),
          catchError(() => of({type: '[Order]loadPurchaseOrderByIdFailure'}))
        )
      )
    )
  );

  /**
   * Effect to update confirmed order details
   */
  loadConfirmedOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadConfirmedOrderById),
      mergeMap((action) =>
        from(this.orderService.getById(action.confirmedOrderId)).pipe(
          map((confirmedOrder: ConfirmedOrder) => OrderActions.addLoadedConfirmedOrder({confirmedOrder: confirmedOrder})),
          catchError(() => of({type: '[Order]loadConfirmedOrderByIdFailure'}))
        )
      )
    )
  );

  /**
   * Effect to update purchase order items
   */
  loadPurchaseOrderItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadPurchaseOrderItems),
      mergeMap((action) =>
        from(this.purchaseOrderService.getItemsByPurchaseOrderId(action.purchaseOrderId, action.quoteId)).pipe(
          map((itemsPage: OrderItemPage) => OrderActions.addLoadedPurchaseOrderItems({
            purchaseOrderId: action.purchaseOrderId,
            quoteId: action.quoteId,
            items: itemsPage.results
          })),
          catchError(() => of({type: '[Order]loadPurchaseOrderItemsFailure'}))
        )
      )
    )
  );

  /**
   * Effect to update confirmed order items
   */
  loadConfirmedOrderItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadConfirmedOrderItems),
      mergeMap((action) =>
        from(this.orderService.getItemsByOrderId(action.confirmedOrderId, action.quoteId)).pipe(
          map((itemsPage: OrderItemPage) => OrderActions.addLoadedConfirmedOrderItems({
            confirmedOrderId: action.confirmedOrderId,
            quoteId: action.quoteId,
            items: itemsPage.results
          })),
          catchError(() => of({type: '[Order]loadConfirmedOrderItemsFailure'}))
        )
      )
    )
  );

  /**
   * Effect to upload purchase order file
   */
  uploadPurchaseOrderFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.uploadPurchaseOrderFile),
      throttleTime(8000),
      mergeMap((action) =>
        from(this.fileService.uploadFile(action.fileForm)).pipe(
          mergeMap(() => of({type:'[Order]uploadPurchaseOrderFile'})),
          catchError(() => of({type: '[Order]uploadPurchaseOrderFileFailure'}))
        )
      )
    )
  );



  /**
   * Effect to load quotes
   */
  loadQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadQuotes),
      throttleTime(5000),
      mergeMap((action) =>
        from(this.quotesService.getQuotes(action.searchFilter, action.pageSize, action.page)).pipe(
          mergeMap(() => of({type:'[Order]loadQuotes'})),
          catchError(() => of({type: '[Order]loadQuotesFailure'}))
        )
      )
    )
  );

  /**
   * Effect to load purchase orders
   */
  loadPurchaseOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadPurchaseOrders),
      mergeMap((action) =>
        from(this.purchaseOrderService.getPurchaseOrders(action.searchFilter, action.pageSize, action.page)).pipe(
          mergeMap(() => of({type:'[Order]loadPurchaseOrders'})),
          catchError(() => of({type: '[Order]loadPurchaseOrdersFailure'}))
        )
      )
    )
  );

  /**
   * Effect to load orders
   */
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap((action) =>
        from(this.orderService.getOrders(action.searchFilter, action.isClosed)).pipe(
          mergeMap(() => of({type:'[Order]loadPurchaseOrders'})),
          catchError(() => of({type: '[Order]loadPurchaseOrdersFailure'}))
        )
      )
    )
  );
}
