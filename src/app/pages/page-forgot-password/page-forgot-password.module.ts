import { NgModule } from '@angular/core';
import { PgForgotPasswordComponent } from './pg-forgot-password/pg-forgot-password.component';
import { PageForgotPasswordRoutingModule } from './page-forgot-password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgForgotPasswordComponent,
  ],
  imports: [
    PageForgotPasswordRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PageForgotPasswordModule { }
