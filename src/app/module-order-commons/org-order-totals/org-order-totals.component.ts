import { Component, Input, OnInit } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { PurchaseOrder } from 'app/model/purchase-order';

/**
 * Component to show order totals
 * @export
 * @class OrgOrderTotalsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-order-totals',
  templateUrl: './org-order-totals.component.html',
  styleUrls: ['./org-order-totals.component.scss']
})
export class OrgOrderTotalsComponent implements OnInit {
  
  /**
   * Order to show totals
   * @type {(ConfirmedOrder | PurchaseOrder)}
   */
  @Input() order!: ConfirmedOrder | PurchaseOrder;
  
  /**
   * Order express freight outsider items total
   */
  expressFreightOutsiderItems = 0;

  /**
   * Order express freight outsider totals
   */
  expressFreightOutsiderTotal = 0;

  /**
   * Order express freight items totals
   */
  expressFreightItems = 0;

  /**
   * Order express freight totals 
   */
  expressFreightTotal = 0;

  /**
   * Order sub total
   */
  subTotal = 0;

  /**
   * Order tax amount
   */
  taxAmount = 0;

  /**
   * Order total amount
   */
  totalAmount = 0;

  /**
   * Initializing method
   */
  ngOnInit(): void {
    const order = (this.order as ConfirmedOrder);
    if(order.totalVAT) {
      this.subTotal = order.subtotal || 0;
      this.expressFreightItems = order.expressFreightItems || 0;
      this.expressFreightTotal = order.expressFreightTotal || 0;
      this.taxAmount = order.totalVAT || 0;
      this.totalAmount = order.totalAmount || 0;
    }
    const purchaseOrder = (this.order as PurchaseOrder);
    if(purchaseOrder.saleTax) {
      this.subTotal = purchaseOrder.subtotal || 0;
      this.expressFreightOutsiderItems = purchaseOrder.freightOutsiderDetails?.itemCount || 0;
      this.expressFreightOutsiderTotal = purchaseOrder.freightOutsiderDetails?.amount || 0;
      this.expressFreightItems = purchaseOrder.freightExpressDetails?.itemCount || 0;
      this.expressFreightTotal = purchaseOrder.freightExpressDetails?.amount || 0;
      this.taxAmount = purchaseOrder.saleTax || 0;
      this.totalAmount = purchaseOrder.total || 0;
    }

  }
}
