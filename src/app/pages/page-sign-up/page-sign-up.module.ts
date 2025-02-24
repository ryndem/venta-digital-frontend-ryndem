import { NgModule } from '@angular/core';
import { PgSignUpComponent } from './pg-sign-up/pg-sign-up.component';
import { PageSignUpRoutingModule } from './page-sign-up-routing.module';
import { NgIconsModule } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgSignUpComponent,
  ],
  imports: [
    PageSignUpRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroEye,
      heroEyeSlash
    })
  ]
})
export class PageSignUpModule { }
