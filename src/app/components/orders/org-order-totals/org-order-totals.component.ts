import { Component, Input } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';

@Component({
  selector: 'org-order-totals',
  templateUrl: './org-order-totals.component.html',
  styleUrls: ['./org-order-totals.component.scss']
})
export class OrgOrderTotalComponent {
  @Input()
  order!: PurchaseOrder;
}
