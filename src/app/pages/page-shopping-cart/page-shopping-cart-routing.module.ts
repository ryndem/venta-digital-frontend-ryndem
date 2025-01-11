import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgShoppingCartComponent } from './pg-shopping-cart/pg-shopping-cart.component';

const routes: Routes = [
  { path: '', component: PgShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageShoppingCartRoutingModule { }
