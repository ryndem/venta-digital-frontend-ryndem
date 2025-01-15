import { Component, Input as RouterInput } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { loadPurchaseOrderById } from 'app/store/actions/order.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPurchaseOrderDetails } from 'app/store/selectors/order.selectors';

/**
 * Page component to display purchase order details
 *
 * @export
 * @class PgPurchaseOrderDetailsComponent
 */
@Component({
  selector: 'pg-purchase-order-details',
  templateUrl: './pg-purchase-order-details.component.html',
  styleUrls: ['./pg-purchase-order-details.component.scss'],
})
export class PgPurchaseOrderDetailsComponent {

  /**
   * Purchase order id
   * @type {string}
   */
  purchaseOrderId!: string;

  /**
   * Product page
   * @type {(OrderItemPage | null)}
   */
  products: OrderItemPage | null = null;

  /**
   * Store reference (order.purchaseOrders(id))
   * @type {(PurchaseOrder | null)}
   */
  purchaseOrder$: Observable<PurchaseOrder | null>;

  /**
   * Input id setter
   */
  @RouterInput('purchaseOrderId')
  set setInputId(purchaseOrderId: string) {
    this.purchaseOrderId = purchaseOrderId;
    this.purchaseOrder$ = this.store.select(selectPurchaseOrderDetails(this.purchaseOrderId));
    this.store.dispatch(loadPurchaseOrderById({purchaseOrderId: this.purchaseOrderId}));
  }

  /**
   * Creates an instance of PgPurchaseOrderDetailsComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store
  ) {
    this.purchaseOrder$ = this.store.select(selectPurchaseOrderDetails(this.purchaseOrderId));
  }

}
