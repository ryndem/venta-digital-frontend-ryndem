import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrder } from 'app/model/purchase-order';
import { PurchaseOrderService } from 'app/services/purchase-order.service';

@Component({
  selector: 'pg-purchase-order-created',
  templateUrl: './pg-purchase-order-created.component.html',
  styleUrls: ['./pg-purchase-order-created.component.scss'],
})
export class PgPurchaseOrderCreatedComponent implements OnInit {

  isLoading = true;
  purchaseOrderId: string | null = null;
  order: PurchaseOrder | null = null;

  constructor(
    private purchaseOrderService : PurchaseOrderService,
    private currentRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.purchaseOrderId = params['purchaseOrderId'];
      this.loadPurchaseOrder();
    });
  }

  async loadPurchaseOrder() {
    if( this.purchaseOrderId ) {
      this.order = await this.purchaseOrderService.getById(this.purchaseOrderId);
      this.isLoading = false;
    }
  }
}
