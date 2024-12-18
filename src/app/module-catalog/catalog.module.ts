import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { 
  heroCheckCircle, 
  heroChevronDown, 
  heroChevronRight, 
  heroChevronUp, 
  heroEye, 
  heroLockClosed, 
  heroMinus, 
  heroPlus, 
  heroShoppingCart, 
  heroSquaresPlus, 
  heroTrash, 
  heroXMark 
} from '@ng-icons/heroicons/outline';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { PgHomeComponent } from './pg-home/pg-home.component';
import { PgNotFoundComponent } from './pg-not-found/pg-not-found.component';
import { PgPrivacyPolicyComponent } from './pg-privacy-policy/pg-privacy-policy.component';
import { PgProductDetailsComponent } from './pg-product-details/pg-product-details.component';
import { PgProductsComponent } from './pg-products/pg-products.component';
import { PgServerErrorComponent } from './pg-server-error/pg-server-error.component';
import { PgTermsAndConditionsComponent } from './pg-terms-and-conditions/pg-terms-and-conditions.component';
import { OrgCarouselComponent } from './org-carousel/org-carousel.component';
import { OrgProductsGridComponent } from './org-products-grid/org-products-grid.component';
import { OrgCategoriesGalleryComponent } from './org-categories-gallery/org-categories-gallery.component';
import { OrgHelpContactComponent } from './org-help-contact/org-help-contact.component';
import { OrgProductCardComponent } from './org-product-card/org-product-card.component';
import { OrgProductDetailsComponent } from './org-product-details/org-product-details.component';
import { OrgProductDetailsCardComponent } from './org-product-details-card/org-product-details-card.component';
import { OrgCategoryCardComponent } from './org-category-card/org-category-card.component';
import { OrgPagerComponent } from './org-pager/org-pager.component';
import { OrgCategoriesBarComponent } from './org-categories-bar/org-categories-bar.component';
import { AtmShoppingButtonComponent } from './atm-shopping-button/atm-shopping-button.component';
import { AtmAuthBannerComponent } from './atm-auth-banner/atm-auth-banner.component';
import { AtmCarouselButtonComponent } from './atm-carousel-button/atm-carousel-button.component';
import { MolCarouselItemComponent } from './mol-carousel-item/mol-carousel-item.component';
import { OrgRelatedProductsComponent } from './org-related-products/org-related-products.component';


@NgModule({
  declarations: [
    PgHomeComponent,
    PgNotFoundComponent,
    PgPrivacyPolicyComponent,
    PgProductsComponent,
    PgProductDetailsComponent,
    PgServerErrorComponent,
    PgTermsAndConditionsComponent,
    OrgCarouselComponent,
    OrgCategoriesBarComponent,
    OrgCategoriesGalleryComponent,
    OrgCategoryCardComponent,
    OrgHelpContactComponent,
    OrgPagerComponent,
    OrgProductCardComponent,
    OrgProductDetailsComponent,
    OrgProductDetailsCardComponent,
    OrgProductsGridComponent,
    OrgRelatedProductsComponent,
    MolCarouselItemComponent,
    AtmAuthBannerComponent,
    AtmCarouselButtonComponent,
    AtmShoppingButtonComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    AppCommonsModule,
    NgIconsModule.withIcons({
      heroCheckCircle,
      heroChevronDown,
      heroChevronRight,
      heroChevronUp,
      heroEye,
      heroMinus,
      heroLockClosed,
      heroPlus,
      heroShoppingCart,
      heroSquaresPlus,
      heroTrash,
      heroXMark,
    })
  ],
  exports: [ 
    OrgRelatedProductsComponent
  ]
})
export class CatalogModule { }
