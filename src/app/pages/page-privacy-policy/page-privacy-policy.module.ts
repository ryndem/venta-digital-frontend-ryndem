import { NgModule } from '@angular/core';
import { PgPrivacyPolicyComponent } from '../page-privacy-policy/pg-privacy-policy/pg-privacy-policy.component';
import { PagePrivacyPolicyRoutingModule } from './page-privacy-policy-routing.module';


@NgModule({
  declarations: [
    PgPrivacyPolicyComponent,
  ],
  imports: [
    PagePrivacyPolicyRoutingModule
  ]
})
export class PagePrivacyPolicyModule { }
