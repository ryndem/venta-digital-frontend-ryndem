import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgAccountActivatedComponent } from './pg-account-activated/pg-account-activated.component';

const routes: Routes = [
  { path: '', component: PgAccountActivatedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageAccountActivatedRoutingModule { }
