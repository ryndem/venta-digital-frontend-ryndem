import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgResetPasswordComponent } from './pg-reset-password/pg-reset-password.component';

const routes: Routes = [
  { path: '', component: PgResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageResetPasswordRoutingModule { }
