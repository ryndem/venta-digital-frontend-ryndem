import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgShoppingCartComponent } from './pg-shopping-cart/pg-shopping-cart.component';
import { PgQuoteSubmissionComponent } from './pg-quote-submission/pg-quote-submission.component';
import { PgThankYouComponent } from './pg-thank-you/pg-thank-you.component';

const routes: Routes = [
  { path: 'shopping-cart', component: PgShoppingCartComponent },
  { path: 'quote-submission', component: PgQuoteSubmissionComponent },
  { path: 'thank-you', component: PgThankYouComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
