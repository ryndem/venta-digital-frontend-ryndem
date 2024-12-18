import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';
import { 
  heroArrowLeft, 
  heroChevronDown, 
  heroChevronUp, 
  heroFolder, 
  heroFolderOpen
} from '@ng-icons/heroicons/outline';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { PgOrderDetailsComponent } from './pg-order-details/pg-order-details.component';
import { PgOrderListComponent } from './pg-order-list/pg-order-list.component';
import { PgPurchaseOrderCreatedComponent } from './pg-purchase-order-created/pg-purchase-order-created.component';
import { PgPurchaseOrderCreationComponent } from './pg-purchase-order-creation/pg-purchase-order-creation.component';
import { PgPurchaseOrderDetailsComponent } from './pg-purchase-order-details/pg-purchase-order-details.component';
import { PgQuoteDetailsComponent } from './pg-quote-details/pg-quote-details.component';
import { OrgOrderElementCardComponent } from './org-order-element-card/org-order-element-card.component';
import { OrgOrderItemCardComponent } from './org-order-item-card/org-order-item-card.component';
import { OrgOrderQuoteCardComponent } from './org-order-quote-card/org-order-quote-card.component';
import { OrgOrderSummaryCardComponent } from './org-order-summary-card/org-order-summary-card.component';
import { OrgOrderTotalsComponent } from './org-order-totals/org-order-totals.component';
import { OrgPurchaseOrderItemFormCardComponent } from './org-purchase-order-item-form-card/org-purchase-order-item-form-card.component';
import { OrgQuotesDescriptionComponent } from './org-quotes-description/org-quotes-description.component';
import { OrgQuoteOrderListComponent } from './org-quote-order-list/org-quote-order-list.component';
import { OrgQuoteSummaryCardComponent } from './org-quote-summary-card/org-quote-summary-card.component';
import { MolActiveOrderNotSavedBannerComponent } from './mol-order-not-saved-banner/mol-active-order-not-saved-banner.component';
import { MolFileUploaderComponent } from './mol-file-uploader/mol-file-uploader.component';
import { OrgPurchaseOrderItemCardComponent } from './org-purchase-order-item-card/org-purchase-order-item-card.component';
import { OrgPurchaseOrderSummaryCardComponent } from './org-purchase-order-summary-card/org-purchase-order-summary-card.component';
import { OrgPurchaseOrderTotalsComponent } from './org-purchase-order-totals/org-purchase-order-totals.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    
    PgOrderDetailsComponent,
    PgOrderListComponent,
    PgPurchaseOrderCreatedComponent,
    PgPurchaseOrderCreationComponent,
    PgPurchaseOrderDetailsComponent,
    PgQuoteDetailsComponent,
    OrgOrderElementCardComponent,
    OrgOrderItemCardComponent,
    OrgOrderQuoteCardComponent,
    OrgOrderSummaryCardComponent,
    OrgPurchaseOrderSummaryCardComponent,
    OrgOrderTotalsComponent,
    OrgPurchaseOrderTotalsComponent,
    OrgPurchaseOrderItemCardComponent,
    OrgPurchaseOrderItemFormCardComponent,
    OrgQuoteOrderListComponent,
    OrgQuotesDescriptionComponent,
    OrgQuoteSummaryCardComponent,
    MolActiveOrderNotSavedBannerComponent,
    MolFileUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppCommonsModule,
    OrdersRoutingModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroChevronDown,
      heroChevronUp,
      heroFolder,
      heroFolderOpen,
    }),
  ]
})
export class OrdersModule { }
