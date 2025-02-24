import { NgModule } from '@angular/core';
import { PgTermsAndConditionsComponent } from './pg-terms-and-conditions/pg-terms-and-conditions.component';
import { PageTermsAndConditionsRoutingModule } from './page-terms-and-conditions-routing.module';


@NgModule({
  declarations: [
    PgTermsAndConditionsComponent,
  ],
  imports: [
    PageTermsAndConditionsRoutingModule
  ],
})
export class PageTermsAndConditionsModule { }
