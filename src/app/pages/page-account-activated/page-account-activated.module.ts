import { NgModule } from '@angular/core';
import { PageAccountActivatedRoutingModule } from './page-account-activated-routing.module';
import { PgAccountActivatedComponent } from './pg-account-activated/pg-account-activated.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgAccountActivatedComponent,
  ],
  imports: [
    PageAccountActivatedRoutingModule,
    AppCommonsModule,
    CommonModule
  ]
})
export class PageAccountActivatedModule { }
