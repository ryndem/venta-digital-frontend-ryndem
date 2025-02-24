import { NgModule } from '@angular/core';
import { PageQuoteSubmissionRoutingModule } from './page-quote-submission-routing.module';
import { PgQuoteSubmissionComponent } from './pg-quote-submission/pg-quote-submission.component';
import { MolQuoteChangeBannerComponent } from './mol-quote-change-banner.component/mol-quote-change-banner.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { heroInformationCircleSolid } from '@ng-icons/heroicons/solid';
import { CatalogCommonsModule } from 'app/module-catalog-commons/catalog-commons.module';


@NgModule({
  declarations: [
    PgQuoteSubmissionComponent,
    MolQuoteChangeBannerComponent,
  ],
  imports: [
    AppCommonsModule,
    CatalogCommonsModule,
    CommonModule,
    PageQuoteSubmissionRoutingModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroInformationCircleSolid,
    })
  ],
  exports: [ 
  ]
})
export class PageQuoteSubmissionModule { }
