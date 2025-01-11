import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgPurchaseOrderDetailsComponent } from './pg-purchase-order-details/pg-purchase-order-details.component';

const routes: Routes = [
  { path: '', component: PgPurchaseOrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePurchaseOrderDetailsRoutingModule { }
