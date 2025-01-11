import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgSignUpComponent } from './pg-sign-up/pg-sign-up.component';

const routes: Routes = [
  { path: '', component: PgSignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageSignUpRoutingModule { }
