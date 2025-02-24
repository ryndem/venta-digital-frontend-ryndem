import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgServerErrorComponent } from './pg-server-error/pg-server-error.component';

const routes: Routes = [
  { path: '', component: PgServerErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageServerErrorRoutingModule { }
