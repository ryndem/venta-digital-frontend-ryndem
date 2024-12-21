import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { 
  heroArrowLeft, 
  heroLockClosed, 
  heroSquaresPlus 
} from '@ng-icons/heroicons/outline';
import { heroBoltSolid, heroInformationCircleSolid } from '@ng-icons/heroicons/solid';

import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CatalogModule } from 'app/module-catalog/catalog.module';
import { PgQuoteSubmissionComponent } from './pg-quote-submission/pg-quote-submission.component';
import { PgThankYouComponent } from './pg-thank-you/pg-thank-you.component';
import { PgShoppingCartComponent } from './pg-shopping-cart/pg-shopping-cart.component';
import { OrgShoppingCartItemCardComponent } from './org-shopping-cart-item-card/org-shopping-cart-item-card.component';
import { OrgShoppingCartItemDeletedCardComponent } from './org-shopping-cart-item-deleted-card/org-shopping-cart-item-deleted-card.component';
import { MolQuoteChangeBannerComponent } from './mol-quote-change-banner.component/mol-quote-change-banner.component';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [
    PgQuoteSubmissionComponent,
    PgShoppingCartComponent,
    PgThankYouComponent,
    OrgShoppingCartItemCardComponent,
    OrgShoppingCartItemDeletedCardComponent,
    MolQuoteChangeBannerComponent,
  ],
  imports: [
    CommonModule,
    AppCommonsModule,
    CatalogModule,
    CartRoutingModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroInformationCircleSolid,
      heroLockClosed,
      heroSquaresPlus
    }),
  ]
})
export class CartModule { }
