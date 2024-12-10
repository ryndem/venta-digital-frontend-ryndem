import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { User } from 'app/model/user';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'purchase-order-created-page',
  templateUrl: './purchase-order-created-page.component.html',
  styleUrls: ['./purchase-order-created-page.component.scss'],
})
export class PurchaseOrderCreatedPageComponent implements OnInit {
  isLoading = true;
  user: User | null = null;

  purchaseOrderId: string | null = null;
  order: PurchaseOrder | null = null;

  constructor(
    private purchaseOrderService : PurchaseOrderService,
    private currentRoute: ActivatedRoute,
    private store: Store<{ user: UserState }>
  ) {
    this.store.subscribe( event => {
      this.user = event.user.user;
    });
  }

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
