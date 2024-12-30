import { Component, Input } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';

/**
 * Component to show purchase order totals
 * @export
 * @class OrgPurchaseOrderTotalsComponent
 */
@Component({
  selector: 'org-purchase-order-totals',
  templateUrl: './org-purchase-order-totals.component.html',
  styleUrls: ['./org-purchase-order-totals.component.scss']
})
export class OrgPurchaseOrderTotalsComponent {
  

  /**
   * Purchase order to show totals
   * @type {PurchaseOrder}
   */
  @Input() purchaseOrder!: PurchaseOrder;

}
