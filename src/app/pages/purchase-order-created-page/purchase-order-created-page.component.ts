import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'app/model/order';
import { User } from 'app/model/user';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'purchase-order-created-page',
  templateUrl: './purchase-order-created-page.component.html',
  styleUrl: './purchase-order-created-page.component.scss',
})
export class PurchaseOrderCreatedPageComponent implements OnInit {
  isLoading: boolean = true;
  user: User | null = null;
  
  purchaseOrderId: string | null = null;
  order: Order | null = null;
  

  constructor( 
      private orderService : OrderService, 
      private currentRoute: ActivatedRoute, 
      private store: Store<any>) {
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
      this.order = await this.orderService.getById(this.purchaseOrderId);
      this.isLoading = false;
    }
  }
}
