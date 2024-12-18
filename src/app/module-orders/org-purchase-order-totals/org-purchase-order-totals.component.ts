import { Component, Input } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';

@Component({
  selector: 'org-purchase-order-totals',
  templateUrl: './org-purchase-order-totals.component.html',
  styleUrls: ['./org-purchase-order-totals.component.scss']
})
export class OrgPurchaseOrderTotalsComponent {
  
  @Input() purchaseOrder!: PurchaseOrder;

}
