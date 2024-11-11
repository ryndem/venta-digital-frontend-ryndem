import { Component, Input as RouterInput } from '@angular/core';
import { Order } from 'app/model/order';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'purchase-order-details-page',
  templateUrl: './purchase-order-details-page.component.html',
  styleUrl: './purchase-order-details-page.component.scss',
})
export class PurchaseOrderDetailsPageComponent {

  purchaseOrderId!: string;
  purchaseOrder: Order | null = null;

  @RouterInput('purchaseOrderId')
  set setInputId(purchaseOrderId: string) {
    this.purchaseOrderId = purchaseOrderId;
    this.loadPurchaseOrder();
  }

  constructor(private orderService: OrderService) {}

  async loadPurchaseOrder() {
    this.purchaseOrder = await this.orderService.getById(this.purchaseOrderId);
  }

}
