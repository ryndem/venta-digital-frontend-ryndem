import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgTermsAndConditionsComponent } from './pg-terms-and-conditions/pg-terms-and-conditions.component';

const routes: Routes = [
  { path: '', component: PgTermsAndConditionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageTermsAndConditionsRoutingModule { }
