import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgForgotPasswordComponent } from './pg-forgot-password/pg-forgot-password.component';

const routes: Routes = [
  { path: '', component: PgForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageForgotPasswordRoutingModule { }
