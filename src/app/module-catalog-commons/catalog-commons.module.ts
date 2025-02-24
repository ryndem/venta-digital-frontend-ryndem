import { NgModule } from '@angular/core';
import { OrgProductCardComponent } from './org-product-card/org-product-card.component';
import { OrgProductDetailsCardComponent } from './org-product-details-card/org-product-details-card.component';
import { OrgProductsGridComponent } from './org-products-grid/org-products-grid.component';
import { OrgRelatedProductsComponent } from './org-related-products/org-related-products.component';
import { OrgShoppingCartItemCardComponent } from './org-shopping-cart-item-card/org-shopping-cart-item-card.component';
import { AtmShoppingButtonComponent } from './atm-shopping-button/atm-shopping-button.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { AtmAuthBannerComponent } from './atm-auth-banner/atm-auth-banner.component';
import { OrgHelpContactComponent } from './org-help-contact/org-help-contact.component';
import { heroCheckCircle, heroChevronRight, heroEye, heroLockClosed } from '@ng-icons/heroicons/outline';
import { heroBoltSolid } from '@ng-icons/heroicons/solid';


@NgModule({
  declarations: [
    OrgProductCardComponent,
    OrgProductDetailsCardComponent,
    OrgProductsGridComponent,
    OrgRelatedProductsComponent,
    OrgShoppingCartItemCardComponent,
    OrgHelpContactComponent,
    
    AtmAuthBannerComponent,
    AtmShoppingButtonComponent,
    
  ],
  imports: [
    AppCommonsModule,
    CommonModule,
    RouterModule,

    NgIconsModule.withIcons({
      heroBoltSolid,
      heroCheckCircle,
      heroChevronRight,
      heroEye,
      heroLockClosed,
    }),
  ],
  exports: [
    OrgHelpContactComponent,
    OrgProductCardComponent,
    OrgProductDetailsCardComponent,
    OrgProductsGridComponent,
    OrgRelatedProductsComponent,
    OrgShoppingCartItemCardComponent,

    AtmAuthBannerComponent,
    AtmShoppingButtonComponent,
  ]
})
export class CatalogCommonsModule { }
