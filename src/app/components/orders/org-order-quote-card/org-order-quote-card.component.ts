import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItem } from 'app/model/order-item';
import { Quote } from 'app/model/quote';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'org-order-quote-card',
  templateUrl: './org-order-quote-card.component.html',
  styleUrls: ['./org-order-quote-card.component.scss']
})
export class OrgOrderQuoteCardComponent implements OnChanges {
  
  @Input()
  order!: ConfirmedOrder;

  @Input()
  quote!: Quote;

  @Input()
  selectedQuoteId: string | null = null;

  isOpen = false;
  orderItems: OrderItem[] | null = null;


  constructor (private orderService: OrderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedQuoteId: SimpleChange = changes['selectedQuoteId'];
    
    if (selectedQuoteId.currentValue) {
      console.log('selectedQuoteId', selectedQuoteId);
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.loadItems();
  }

  async loadItems() {
    
    if (!this.orderItems) {
      console.log('LoadItems');
      const page = await this.orderService.getItemsByOrderId(this.order.idOrder, this.quote.idQuotation);
      this.orderItems = page.results;
    }
  }
  

}
