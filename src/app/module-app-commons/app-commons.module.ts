import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronUp } from '@ng-icons/heroicons/outline';
import { UsdCurrencyPipe } from './pipes/usd-currency.pipe';
import { MolAddressSelectorComponent } from './mol-address-selector/mol-address-selector.component';
import { MolFileDownloaderComponent } from './mol-file-downloader/mol-file-downloader.component';
import { AtmLoaderPointsComponent } from './atm-loader-points/atm-loader-points.component';
import { AtmLoaderCircleComponent } from './atm-loader-circle/atm-loader-circle.component';
import { AtmClosableModalComponent } from './atm-closable-modal/atm-closable-modal.component';
import { AtmQuantitySelectorComponent } from './atm-quantity-selector/atm-quantity-selector.component';
import { AtmSkeletonOrderCardComponent } from './atm-skeleton-order-card/atm-skeleton-order-card.component';
import { AtmSkeletonProductCardComponent } from './atm-skeleton-product-card/atm-skeleton-product-card.component';
import { AtmSkeletonProductDetailCardComponent } from './atm-skeleton-product-detail-card/atm-skeleton-product-detail-card.component';
import { AtmSkeletonProductDetailCardSummaryComponent } from './atm-skeleton-product-detail-summary-card/atm-skeleton-product-detail-summary-card.component';
import { AtmCategoryCardComponent } from 'app/module-app-commons/atm-category-card/atm-category-card.component';
import { OrgLoginModalComponent } from 'app/module-app-commons/org-login-modal/org-login-modal.component';
import { RouterModule } from '@angular/router';
import { OrgQuoteDetailInfoComponent } from './org-quote-detail-info/org-quote-detail-info.component';
import { OrgQuoteItemCardComponent } from './org-quote-item-card/org-quote-item-card.component';
import { OrgQuoteTotalsComponent } from './org-quote-totals/org-quote-totals.component';
import { OrgQuoteUserInfoComponent } from './org-quote-user-info/org-quote-user-info.component';



@NgModule({
  declarations: [
    MolAddressSelectorComponent,
    MolFileDownloaderComponent,
    AtmCategoryCardComponent,
    AtmClosableModalComponent,
    AtmLoaderCircleComponent,
    AtmLoaderPointsComponent,
    AtmQuantitySelectorComponent,
    AtmSkeletonOrderCardComponent,
    AtmSkeletonProductCardComponent,
    AtmSkeletonProductDetailCardComponent,
    AtmSkeletonProductDetailCardSummaryComponent,

    OrgLoginModalComponent,
    OrgQuoteDetailInfoComponent,
    OrgQuoteItemCardComponent,
    OrgQuoteTotalsComponent,
    OrgQuoteUserInfoComponent,

    UsdCurrencyPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIconsModule.withIcons({
      heroChevronUp
    }),
  ],
  
  exports: [
    MolAddressSelectorComponent,
    MolFileDownloaderComponent,
    
    AtmCategoryCardComponent,
    AtmLoaderCircleComponent,
    AtmLoaderPointsComponent,
    AtmQuantitySelectorComponent,
    AtmClosableModalComponent,
    AtmSkeletonOrderCardComponent,
    AtmSkeletonProductCardComponent,
    AtmSkeletonProductDetailCardComponent,
    AtmSkeletonProductDetailCardSummaryComponent,
    OrgLoginModalComponent,
    OrgQuoteDetailInfoComponent,
    OrgQuoteItemCardComponent,
    OrgQuoteTotalsComponent,
    OrgQuoteUserInfoComponent,
    UsdCurrencyPipe,

  ]
})
export class AppCommonsModule { }
''