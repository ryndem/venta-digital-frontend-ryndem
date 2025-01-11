import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgThankYouComponent } from './pg-thank-you/pg-thank-you.component';

const routes: Routes = [
  { path: '', component: PgThankYouComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageThankYouRoutingModule { }
