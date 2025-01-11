import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgOrderListComponent } from './pg-order-list/pg-order-list.component';

const routes: Routes = [
  { path: '', component: PgOrderListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageOrderListRoutingModule { }
