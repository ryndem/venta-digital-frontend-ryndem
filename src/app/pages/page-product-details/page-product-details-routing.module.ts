import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgProductDetailsComponent } from './pg-product-details/pg-product-details.component';

const routes: Routes = [
  { path: '', component: PgProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageProductDetailsRoutingModule { }
