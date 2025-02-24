import { NgModule } from '@angular/core';
import { PgOrderDetailsComponent } from './pg-order-details/pg-order-details.component';
import { PageOrderDetailsRoutingModule } from './page-order-details-routing.module';
import { OrgOrderSummaryCardComponent } from './org-order-summary-card/org-order-summary-card.component';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroFolder, heroFolderOpen } from '@ng-icons/heroicons/outline';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { OrderCommonsModule } from 'app/module-order-commons/order-commons.module';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';


@NgModule({
  declarations: [
    PgOrderDetailsComponent,
    OrgOrderSummaryCardComponent,
  ],
  imports: [
    PageOrderDetailsRoutingModule,
    AppCommonsModule,
    OrderCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroFolder,
      heroFolderOpen
    })
  ]
})
export class PageOrderDetailsModule { }
