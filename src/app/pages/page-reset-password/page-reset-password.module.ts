import { NgModule } from '@angular/core';
import { PageResetPasswordRoutingModule } from './page-reset-password-routing.module';
import { PgResetPasswordComponent } from './pg-reset-password/pg-reset-password.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PgResetPasswordComponent,
  ],
  imports: [
    PageResetPasswordRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroEye,
      heroEyeSlash,
    })
  ]
})
export class PageResetPasswordModule { }
