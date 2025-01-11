import { NgModule } from '@angular/core';
import { PageThankYouRoutingModule } from './page-thank-you-routing.module';
import { PgThankYouComponent } from './pg-thank-you/pg-thank-you.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgThankYouComponent,
  ],
  imports: [
    PageThankYouRoutingModule,
    AppCommonsModule,
    CommonModule
  ],
})
export class PageThankYouModule { }
