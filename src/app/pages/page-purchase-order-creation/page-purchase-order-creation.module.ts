import { NgModule } from '@angular/core';
import { PagePurchaseOrderCreationRoutingModule } from './page-purchase-order-creation-routing.module';
import { PgPurchaseOrderCreationComponent } from './pg-purchase-order-creation/pg-purchase-order-creation.component';
import { MolFileUploaderComponent } from './mol-file-uploader/mol-file-uploader.component';
import { NgIconsModule } from '@ng-icons/core';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { heroArrowLeft, heroChevronLeft, heroChevronRight, heroShoppingCart, heroXMark } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrgPurchaseOrderItemFormCardComponent } from './org-purchase-order-item-form-card/org-purchase-order-item-form-card.component';
import { MolActiveOrderNotSavedBannerComponent } from './mol-active-order-not-saved-banner/mol-active-order-not-saved-banner.component';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';


@NgModule({
  declarations: [
    PgPurchaseOrderCreationComponent,
    OrgPurchaseOrderItemFormCardComponent,
    MolActiveOrderNotSavedBannerComponent,
    MolFileUploaderComponent,
  ],
  imports: [
    PagePurchaseOrderCreationRoutingModule,
    AppCommonsModule,
    CommonModule,
    FormsModule,

    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroChevronLeft,
      heroChevronRight,
      heroShoppingCart,
      heroXMark,
    })
  ]
})

export class PagePurchaseOrderCreationModule { }
