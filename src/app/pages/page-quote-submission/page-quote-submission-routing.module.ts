import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgQuoteSubmissionComponent } from './pg-quote-submission/pg-quote-submission.component';

const routes: Routes = [
  { path: '', component: PgQuoteSubmissionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageQuoteSubmissionRoutingModule { }
