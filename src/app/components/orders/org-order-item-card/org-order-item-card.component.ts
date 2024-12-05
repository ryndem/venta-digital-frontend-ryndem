import { Component, Input } from '@angular/core';
import { OrderItem } from 'app/model/order-item';

@Component({
  selector: 'org-order-item-card',
  templateUrl: './org-order-item-card.component.html',
  styleUrls: ['./org-order-item-card.component.scss']
})
export class OrgOrderItemCardComponent {
  
  @Input()
  orderItem!: OrderItem;

  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
