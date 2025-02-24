import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgPurchaseOrderCreatedComponent } from './pg-purchase-order-created/pg-purchase-order-created.component';

const routes: Routes = [
  { path: '', component: PgPurchaseOrderCreatedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePurchaseOrderCreatedRoutingModule { }
