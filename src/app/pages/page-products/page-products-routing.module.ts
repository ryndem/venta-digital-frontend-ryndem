import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgProductsComponent } from './pg-products/pg-products.component';

const routes: Routes = [
  { path: '', component: PgProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageProductsRoutingModule { }
