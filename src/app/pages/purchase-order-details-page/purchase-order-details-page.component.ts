import { Component, Input as RouterInput } from '@angular/core';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { StatusFilterItem } from '../../model/status-filter-carousel';

@Component({
  selector: 'purchase-order-details-page',
  templateUrl: './purchase-order-details-page.component.html',
  styleUrls: ['./purchase-order-details-page.component.scss'],
})
export class PurchaseOrderDetailsPageComponent {
  purchaseOrderId!: string;
  purchaseOrder: PurchaseOrder | null = null;
  products: OrderItemPage | null = null;

  stateFiltersCarousel: StatusFilterItem[] = [
    {
      text: 'Todos',
      isSelected: true,
    },
    {
      text: 'Pedido en Tránsito',
      isSelected: false,
    },
    {
      text: 'En Compra',
      isSelected: false,
    },
    {
      text: 'Producto Embarcado',
      isSelected: false,
    },
    {
      text: 'En Camino a Almacén Matriz',
      isSelected: false,
    },
    {
      text: 'En Camino',
      isSelected: false,
    },
    {
      text: 'Prueba',
      isSelected: false,
    },
    {
      text: 'Prueba2',
      isSelected: false,
    },
    {
      text: 'Prueba3',
      isSelected: false,
    },
  ];

  @RouterInput('purchaseOrderId')
  set setInputId(purchaseOrderId: string) {
    this.purchaseOrderId = purchaseOrderId;
    this.loadPurchaseOrder();
  }

  constructor(private purchaseOrderService: PurchaseOrderService) {}

  async loadPurchaseOrder() {
    this.purchaseOrder = await this.purchaseOrderService.getById(
      this.purchaseOrderId
    );
    this.products =
      await this.purchaseOrderService.getProductsByPurchaseOrderId(
        this.purchaseOrderId
      );
  }

  carouselItem(item: StatusFilterItem): void {
    console.warn('item', item);
  }
}
