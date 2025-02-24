import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgPurchaseOrderCreationComponent } from './pg-purchase-order-creation/pg-purchase-order-creation.component';

const routes: Routes = [
  { path: '', component: PgPurchaseOrderCreationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePurchaseOrderCreationRoutingModule { }
