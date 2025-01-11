import { NgModule } from '@angular/core';
import { PgShoppingCartComponent } from './pg-shopping-cart/pg-shopping-cart.component';
import { PageShoppingCartRoutingModule } from './page-shopping-cart-routing.module';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { OrgShoppingCartItemDeletedCardComponent } from './org-shopping-cart-item-deleted-card/org-shopping-cart-item-deleted-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroLockClosed, heroSquaresPlus } from '@ng-icons/heroicons/outline';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';
import { CatalogCommonsModule } from 'app/module-catalog-commons/catalog-commons.module';


@NgModule({
  declarations: [
    PgShoppingCartComponent,
    OrgShoppingCartItemDeletedCardComponent
  ],
  imports: [
    PageShoppingCartRoutingModule,
    AppCommonsModule,
    CommonModule,
    CatalogCommonsModule,
    NgIconsModule.withIcons({
      heroArrowLeft,
      heroBoltSolid,
      heroLockClosed,
      heroSquaresPlus,
    }),
  ],
})
export class PageShoppingCartModule { }
