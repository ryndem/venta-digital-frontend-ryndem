import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItem } from 'app/model/order-item';
import { PurchaseOrder } from 'app/model/purchase-order';
import { Quote } from 'app/model/quote';
import { loadConfirmedOrderItems, loadPurchaseOrderItems } from 'app/store/actions/order.actions';
import { selectConfirmedOrderItems, selectPurchaseOrderItems } from 'app/store/selectors/order.selectors';
import { Observable } from 'rxjs';

/**
 * Component to show order quote card
 * @export
 * @class OrgOrderQuoteCardComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-order-quote-card',
  templateUrl: './org-order-quote-card.component.html',
  styleUrls: ['./org-order-quote-card.component.scss']
})
export class OrgOrderQuoteCardComponent implements OnChanges {

  /**
   * Confirmed order 
   * @type {ConfirmedOrder}
   */
  @Input() order!: ConfirmedOrder | null;

  /**
   * Purchased order 
   * @type {PurchaseOrder}
   */
    @Input() purchaseOrder!: PurchaseOrder | null;

  /**
   * Quote of the item selected
   * @type {Quote}
   */
  @Input() quote!: Quote;

  /**
   * Quote id of the item selected
   * @type {(string | null)}
   */
  @Input() selectedQuoteId: string | null = null;

  /**
   * Flag to open/close the card
   */
  isOpen = false;

  /**
   * Flag to track if the items are already loaded
   */
  areItemsLoaded = false;
  
  /**
   * Items included on the order
   * @type {(OrderItem[] | null)}
   */
  orderItems: OrderItem[] | null = null;

  /**
   * Items included on the order
   * @type {(OrderItem[] | null)}
   */
  orderItems$: Observable<OrderItem[] | null>;

  /**
   * Creates an instance of OrgOrderQuoteCardComponent.
   * @param {Store} store
   */
  constructor (
    private store: Store
  ) {
    this.orderItems$ = this.store.select(selectConfirmedOrderItems('',''))
  }


  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const selectedQuoteId: SimpleChange = changes['selectedQuoteId'];
    const purchaseOrder: SimpleChange = changes['purchaseOrder'];
    const order: SimpleChange = changes['order'];
    const quote: SimpleChange = changes['quote'];

    if (purchaseOrder?.currentValue) {
      this.updateSelector(purchaseOrder.currentValue?.idPurchaseOrder, this.order?.idOrder, this.quote?.idQuotation);
    }

    if (order?.currentValue) {
      this.updateSelector(this.purchaseOrder?.idPurchaseOrder, order.currentValue?.idOrder, this.quote?.idQuotation);
    }

    if (quote?.currentValue) {
      this.updateSelector(this.purchaseOrder?.idPurchaseOrder, this.order?.idOrder, quote.currentValue.idQuotation);
    }

    if (selectedQuoteId?.currentValue) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  updateSelector(purchaseOrderId: string | undefined, orderId: string | undefined, quoteId: string | undefined) {
    if(purchaseOrderId && quoteId) {
      this.orderItems$ = this.store.select(selectPurchaseOrderItems(purchaseOrderId, quoteId))
    } else if (orderId && quoteId) {
      this.orderItems$ = this.store.select(selectConfirmedOrderItems(orderId, quoteId))
    } else {
      this.orderItems$ = this.store.select(selectConfirmedOrderItems('',''))
    }
  }


  /**
   * Method to toggle card open
   */
  toggleOpen() {
    this.isOpen = !this.isOpen;
    if( this.isOpen ) {
      this.loadItems();
    }
  }

  /**
   * Loads order items
   */
  async loadItems() {
    if(this.areItemsLoaded) return;

    if(this.order) {
      this.store.dispatch(loadConfirmedOrderItems({ confirmedOrderId: this.order.idOrder, quoteId: this.quote.idQuotation}))
      this.areItemsLoaded = true;
    } else if (this.purchaseOrder) {
      this.store.dispatch(loadPurchaseOrderItems({ purchaseOrderId: this.purchaseOrder.idPurchaseOrder, quoteId: this.quote.idQuotation}))
      this.areItemsLoaded = true;
    }
  }


}
