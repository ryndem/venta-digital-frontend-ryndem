import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItem } from 'app/model/order-item';
import { Quote } from 'app/model/quote';
import { OrderService } from 'app/services/order.service';

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
  @Input() order!: ConfirmedOrder;

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
   * Items included on the order
   * @type {(OrderItem[] | null)}
   */
  orderItems: OrderItem[] | null = null;


  /**
   * Creates an instance of OrgOrderQuoteCardComponent.
   * @param {OrderService} orderService
   */
  constructor (private orderService: OrderService) { }


  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const selectedQuoteId: SimpleChange = changes['selectedQuoteId'];

    if (selectedQuoteId.currentValue) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }


  /**
   * Method to toggle card open
   */
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.loadItems();
  }

  /**
   * Loads order items
   */
  async loadItems() {
    if (!this.orderItems) {
      const page = await this.orderService.getItemsByOrderId(this.order.idOrder, this.quote.idQuotation);
      this.orderItems = page.results;
    }
  }


}
