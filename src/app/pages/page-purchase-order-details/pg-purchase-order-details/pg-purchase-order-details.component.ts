import { Component, Input as RouterInput } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { PurchaseOrderService } from 'app/services/purchase-order.service';

/**
 * Page component to display purchase order details
 *
 * @export
 * @class PgPurchaseOrderDetailsComponent
 */
@Component({
  selector: 'pg-purchase-order-details',
  templateUrl: './pg-purchase-order-details.component.html',
  styleUrls: ['./pg-purchase-order-details.component.scss'],
})
export class PgPurchaseOrderDetailsComponent {

  /**
   * Purchase order id
   * @type {string}
   */
  purchaseOrderId!: string;

  /**
   * Purchase order 
   * @type {(PurchaseOrder | null)}
   */
  purchaseOrder: PurchaseOrder | null = null;

  /**
   * Product page
   * @type {(OrderItemPage | null)}
   */
  products: OrderItemPage | null = null;

  /**
   * Input id setter
   */
  @RouterInput('purchaseOrderId')
  set setInputId(purchaseOrderId: string) {
    this.purchaseOrderId = purchaseOrderId;
    this.loadPurchaseOrder();
  }

  /**
   * Creates an instance of PgPurchaseOrderDetailsComponent.
   * @param {PurchaseOrderService} purchaseOrderService
   */
  constructor(private purchaseOrderService: PurchaseOrderService) {}

  /**
   * Method to load purchase order 
   */
  async loadPurchaseOrder() {
    this.purchaseOrder = await this.purchaseOrderService.getById(this.purchaseOrderId);
    this.products = await this.purchaseOrderService.getProductsByPurchaseOrderId(this.purchaseOrderId, '5ddbc2d5-18a3-40f4-afd6-840c25a0f996');
  }

}
