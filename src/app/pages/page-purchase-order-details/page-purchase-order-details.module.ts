import { NgModule } from '@angular/core';
import { PagePurchaseOrderDetailsRoutingModule } from './page-purchase-order-details-routing.module';
import { PgPurchaseOrderDetailsComponent } from './pg-purchase-order-details/pg-purchase-order-details.component';
import { OrgPurchaseOrderSummaryCardComponent } from './org-purchase-order-summary-card/org-purchase-order-summary-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroChevronDown } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { OrgPurchaseOrderTotalsComponent } from './org-purchase-order-totals/org-purchase-order-totals.component';
import { OrgPurchaseOrderItemCardComponent } from './org-purchase-order-item-card/org-purchase-order-item-card.component';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';


@NgModule({
  declarations: [
    PgPurchaseOrderDetailsComponent,
    OrgPurchaseOrderItemCardComponent,
    OrgPurchaseOrderSummaryCardComponent,
    OrgPurchaseOrderTotalsComponent,
  ],
  imports: [
    PagePurchaseOrderDetailsRoutingModule,
    AppCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroChevronDown,
    })
  ]
})

export class PagePurchaseOrderDetailsModule { }
