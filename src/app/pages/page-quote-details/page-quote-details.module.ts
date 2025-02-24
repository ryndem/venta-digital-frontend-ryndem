import { NgModule } from '@angular/core';
import { PgQuoteDetailsComponent } from './pg-quote-details/pg-quote-details.component';
import { PageQuoteDetailsRoutingModule } from './page-quote-details-routing.module';
import { OrgQuoteSummaryCardComponent } from './org-quote-summary-card/org-quote-summary-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgQuoteDetailsComponent,
    OrgQuoteSummaryCardComponent,
  ],
  imports: [
    PageQuoteDetailsRoutingModule,
    AppCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
    })
  ],
})
export class PageQuoteDetailsModule { }
