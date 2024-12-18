import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgPurchaseOrderCreationComponent } from './pg-purchase-order-creation/pg-purchase-order-creation.component';
import { PgPurchaseOrderCreatedComponent } from './pg-purchase-order-created/pg-purchase-order-created.component';
import { PgPurchaseOrderDetailsComponent } from './pg-purchase-order-details/pg-purchase-order-details.component';
import { PgQuoteDetailsComponent } from './pg-quote-details/pg-quote-details.component';
import { PgOrderListComponent } from './pg-order-list/pg-order-list.component';
import { PgOrderDetailsComponent } from './pg-order-details/pg-order-details.component';

const routes: Routes = [
  { path: 'in-progress/creation', component: PgPurchaseOrderCreationComponent },
  { path: 'in-progress/created', component: PgPurchaseOrderCreatedComponent },
  { path: 'in-progress/:purchaseOrderId', component: PgPurchaseOrderDetailsComponent },
  { path: 'quotes/:quoteId', component: PgQuoteDetailsComponent },
  { path: '', component: PgOrderListComponent },
  { path: ':orderId', component: PgOrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
