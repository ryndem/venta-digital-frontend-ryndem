import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgOrderDetailsComponent } from './pg-order-details/pg-order-details.component';

const routes: Routes = [
  { path: '', component: PgOrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageOrderDetailsRoutingModule { }
