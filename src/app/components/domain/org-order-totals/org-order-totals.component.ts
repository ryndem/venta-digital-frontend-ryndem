import { Component, Input } from '@angular/core';
import { Order } from 'app/model/order';

@Component({
  selector: 'org-order-totals',
  templateUrl: './org-order-totals.component.html',
  styleUrls: ['./org-order-totals.component.scss']
})
export class OrgOrderTotalComponent {
  @Input()
  order!: Order;
}
