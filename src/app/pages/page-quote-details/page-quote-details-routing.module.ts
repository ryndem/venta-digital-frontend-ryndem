import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgQuoteDetailsComponent } from './pg-quote-details/pg-quote-details.component';

const routes: Routes = [
  { path: '', component: PgQuoteDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageQuoteDetailsRoutingModule { }
