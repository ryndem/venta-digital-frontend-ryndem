import { NgModule } from '@angular/core';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PgNotFoundComponent } from './pg-not-found/pg-not-found.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgNotFoundComponent,
  ],
  imports: [
    PageNotFoundRoutingModule,
    AppCommonsModule,
    CommonModule
  ]
})

export class PageNotFoundModule { }
