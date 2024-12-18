import { Component, Input, OnInit } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { PurchaseOrder } from 'app/model/purchase-order';

@Component({
  selector: 'org-order-totals',
  templateUrl: './org-order-totals.component.html',
  styleUrls: ['./org-order-totals.component.scss']
})
export class OrgOrderTotalsComponent implements OnInit{
  
  @Input() order!: ConfirmedOrder | PurchaseOrder;
  
  expressFreightOutsiderItems = 0;
  expressFreightOutsiderTotal = 0;
  expressFreightItems = 0;
  expressFreightTotal = 0;
  subTotal = 0;
  taxAmount = 0;
  totalAmount = 0;

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
