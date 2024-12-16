import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroArrowUpTray,
  heroBars3,
  heroCheckCircle,
  heroChevronDown,
  heroChevronLeft,
  heroChevronRight,
  heroChevronUp,
  heroEllipsisHorizontal,
  heroExclamationCircle,
  heroEye,
  heroEyeSlash,
  heroFolder,
  heroFolderOpen,
  heroInformationCircle,
  heroLockClosed,
  heroMagnifyingGlass,
  heroMinus,
  heroPlus,
  heroShoppingCart,
  heroSquaresPlus,
  heroTag,
  heroTrash,
  heroUser,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import {
  heroBoltSolid,
  heroInformationCircleSolid,
} from '@ng-icons/heroicons/solid';

import { ToastrModule } from 'ngx-toastr';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginModalComponent } from './components/modals/org-login-modal/org-login-modal.component';
import { ProductCardComponent } from './components/products/org-product-card/org-product-card.component';
import { ShoppingButtonComponent } from './components/products/atm-shopping-button/atm-shopping-button.component';
import { FooterComponent } from './components/layout/org-footer/org-footer.component';
import { NavButtonComponent } from './components/layout/mol-nav-button/mol-button.component';
import { InfoCardComponent } from './components/commons/org-info-card/org-info-card.component';
import { LayoutFooterComponent } from './components/layout/org-layout-footer/org-layout-footer.component';
import { LayoutHeaderComponent } from './components/layout/org-layout-header/org-layout-header.component';
import { LayoutSearchComponent } from './components/layout/org-layout-search/org-layout-search.component';
import { SplitScreenComponent } from './components/layout/org-split-screen/org-split-screen.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsdCurrencyPipe } from './pipes/usd-currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgProductsGridComponent } from './components/products/org-products-grid/org-products-grid.component';
import { OrgCategoryCardComponent } from './components/categories/org-category-card/org-category-card.component';
import { OrgCategoriesGalleryComponent } from './components/categories/org-categories-gallery/org-categories-gallery.component';
import { AccountActivatedComponent } from './auth/account-activated/account-activated.component';
import { OrgHelpContactComponent } from './components/layout/org-help-contact/org-help-contact.component';
import { OrgCarouselComponent } from './components/carousel/org-carousel/org-carousel.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { OrgProductDetailsCardComponent } from './components/products/org-product-details-card/org-product-details-card.component';
import { OrgProductDetailsComponent } from './components/products/org-product-details/org-product-details.component';
import { OrgRelatedProductsComponent } from './components/products/org-related-products/org-related-products.component';
import { TempMainLayoutComponent } from './components/layout/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/layout/temp-auth-layout/temp-auth-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AtmCategoryCardComponent } from './components/categories/atm-category-card/atm-category-card.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrgCategoriesBarComponent } from './components/categories/org-categories-bar/org-categories-bar.component';
import { OrgMobileNavigationMenuComponent } from './components/layout/org-mobile-navigation-menu/org-mobile-navigation-menu.component';
import { OrgPagerComponent } from './components/commons/org-pager/org-pager.component';
import { MolCarouselItemComponent } from './components/carousel/mol-carousel-item/mol-carousel-item.component';
import { AtmCarouselButtonComponent } from './components/carousel/atm-carousel-button/atm-carousel-button.component';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { userReducer } from './store/users/user.reducer';
import { AtmLoaderPointsComponent } from './components/commons/atm-loader-points/atm-loader-points.component';
import { productReducer } from './store/products/product.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { OrderListPageComponent } from './pages/order-list-page/order-list-page.component';
import { OrgQuotesDescriptionComponent } from './components/quotes/org-quotes-description/org-quotes-description.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { QuoteSubmissionPageComponent } from './pages/quote-submission-page/quote-submission-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { TempQuoterLayoutComponent } from './components/layout/temp-quoter-layout/temp-quoter-layout.component';
import { LayoutQuoterHeaderComponent } from './components/layout/org-layout-quoter-header/org-layout-quoter-header.component';
import { OrgQuoteOrderListComponent } from './components/order-quotes/org-quote-order-list/org-quote-order-list.component';
import { OrgOrderElementCardComponent } from './components/order-quotes/org-order-element-card/org-order-element-card.component';
import { QuoteDetailsPageComponent } from './pages/quote-details-page/quote-details-page.component';
import { OrgShoppingCartItemCardComponent } from './components/shopping-cart/org-shopping-cart-item-card/org-shopping-cart-item-card.component';
import { OrgQuoteItemCardComponent } from './components/quotes/org-quote-item-card/org-quote-item-card.component';
import { OrgQuoteSummaryCardComponent } from './components/quotes/org-quote-summary-card/org-quote-summary-card.component';
import { OrgQuoteUserInfoComponent } from './components/quotes/org-quote-user-info/org-quote-user-info.component';
import { OrgQuoteTotalsComponent } from './components/quotes/org-quote-totals/org-quote-totals.component';
import { AtmAuthBannerComponent } from './components/layout/atm-auth-banner/atm-auth-banner.component';
import { MolAddressSelectorComponent } from './components/dropdowns/mol-address-selector/mol-address-selector.component';
import { MolUserMenuComponent } from './components/dropdowns/mol-user-menu/mol-user-menu.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { PurchaseOrderCreationPageComponent } from './pages/purchase-order-creation-page/purchase-order-creation-page.component';
import { OrgQuoteDetailInfoComponent } from './components/quotes/org-quote-detail-info/org-quote-detail-info.component';
import { MolFileDownloaderComponent } from './components/commons/mol-file-downloader/mol-file-downloader.component';
import { OrgPurchaseOrderItemFormCardComponent } from './components/purchase-orders/org-purchase-order-item-form-card/org-purchase-order-item-form-card.component';
import { MolFileUploaderComponent } from './components/commons/mol-file-uploader/mol-file-uploader.component';
import { PurchaseOrderCreatedPageComponent } from './pages/purchase-order-created-page/purchase-order-created-page.component';
import { PurchaseOrderDetailsPageComponent } from './pages/purchase-order-details-page/purchase-order-details-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';
import { OrgOrderSummaryCardComponent } from './components/orders/org-order-summary-card/org-order-summary-card.component';
import { OrgOrderTotalComponent } from './components/orders/org-order-totals/org-order-totals.component';
import { AtmSkeletonProductCardComponent } from './components/commons/skeleton/atm-skeleton-card/atm-skeleton-product-card.component';
import { AtmLoaderCircleComponent } from './components/commons/atm-loader-circle/atm-loader-circle.component';
import { OrgShoppingCartItemDeletedCardComponent } from './components/shopping-cart/org-shopping-cart-item-deleted-card/org-shopping-cart-item-deleted-card.component';
import { MolActiveOrderBannerComponent } from './components/layout/mol-active-order-banner/mol-active-order-banner.component';
import { AtmSkeletonOrderCardComponent } from './components/commons/skeleton/atm-skeleton-order-card/atm-skeleton-order-card.component';
import { AtmQuantitySelectorComponent } from './components/commons/atm-quantity-selector/atm-quantity-selector.component';
import { OrgPurchaseOrderItemCardComponent } from './components/purchase-orders/org-purchase-order-item-card/org-purchase-order-item-card.component';
import { MolCategoryMenuComponent } from './components/dropdowns/mol-category-menu/mol-category-menu.component';
import { OrgOrderQuoteCardComponent } from './components/orders/org-order-quote-card/org-order-quote-card.component';
import { MolQuoteChangeBannerComponent } from './components/commons/mol-quote-change-banner.component/mol-quote-change-banner.component';
import { MolActiveOrderNotSavedBannerComponent } from './components/purchase-orders/mol-order-not-saved-banner/mol-active-order-not-saved-banner.component';
import { AtmClosableModalComponent } from './components/modals/atm-closable-modal/atm-closable-modal.component';
import { AtmSkeletonProductDetailCardComponent } from './components/commons/skeleton/atm-skeleton-product-detail-card/atm-skeleton-product-detail-card.component';
import { AtmSkeletonProductDetailCardSummaryComponent } from './components/commons/skeleton/atm-skeleton-product-detail-summary-card/atm-skeleton-product-detail-summary-card.component';
import { OrgOrderItemCardComponent } from './components/orders/org-order-item-card/org-order-item-card.component';
import { OrgStatusFilterCarouselModule } from './components/org-status-filter-carousel/org-status-filter-carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutHeaderComponent,
    LayoutQuoterHeaderComponent,
    NavButtonComponent,
    LayoutSearchComponent,
    LayoutFooterComponent,
    ProductCardComponent,
    UsdCurrencyPipe,
    ShoppingButtonComponent,
    LoginModalComponent,
    ResetPasswordComponent,
    HomePageComponent,
    SplitScreenComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    InfoCardComponent,
    OrgProductsGridComponent,
    OrgCategoryCardComponent,
    OrgCategoriesGalleryComponent,
    OrgQuoteOrderListComponent,
    OrgQuotesDescriptionComponent,
    OrgOrderElementCardComponent,
    OrgShoppingCartItemCardComponent,
    OrgShoppingCartItemDeletedCardComponent,
    OrgPurchaseOrderItemFormCardComponent,
    AccountActivatedComponent,
    OrgHelpContactComponent,
    OrgCarouselComponent,
    ProductDetailsPageComponent,
    OrderListPageComponent,
    QuoteDetailsPageComponent,
    OrgProductDetailsCardComponent,
    OrgProductDetailsComponent,
    OrgRelatedProductsComponent,
    TempMainLayoutComponent,
    TempAuthLayoutComponent,
    TempQuoterLayoutComponent,
    NotFoundPageComponent,
    AtmCategoryCardComponent,
    TermsAndConditionsPageComponent,
    PrivacyPolicyPageComponent,
    ProductsPageComponent,
    ShoppingCartPageComponent,
    QuoteSubmissionPageComponent,
    ThankYouPageComponent,
    OrgCategoriesBarComponent,
    OrgMobileNavigationMenuComponent,
    OrgPagerComponent,
    MolCarouselItemComponent,
    AtmCarouselButtonComponent,
    AtmLoaderPointsComponent,
    AtmLoaderCircleComponent,
    OrgQuoteItemCardComponent,
    OrgPurchaseOrderItemCardComponent,
    OrgQuoteUserInfoComponent,
    OrgQuoteTotalsComponent,
    OrgQuoteSummaryCardComponent,
    MolAddressSelectorComponent,
    AtmClosableModalComponent,
    AtmAuthBannerComponent,
    MolActiveOrderBannerComponent,
    MolActiveOrderNotSavedBannerComponent,
    MolUserMenuComponent,
    MolCategoryMenuComponent,
    ServerErrorComponent,
    PurchaseOrderCreationPageComponent,
    PurchaseOrderCreatedPageComponent,
    PurchaseOrderDetailsPageComponent,
    OrderDetailsPageComponent,
    OrgQuoteDetailInfoComponent,
    MolFileDownloaderComponent,
    MolFileUploaderComponent,
    OrgOrderSummaryCardComponent,
    OrgOrderTotalComponent,
    AtmSkeletonProductCardComponent,
    AtmSkeletonOrderCardComponent,
    AtmQuantitySelectorComponent,
    OrgOrderQuoteCardComponent,
    OrgOrderItemCardComponent,
    MolQuoteChangeBannerComponent,
    AtmClosableModalComponent,
    AtmSkeletonProductDetailCardComponent,
    AtmSkeletonProductDetailCardSummaryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrgStatusFilterCarouselModule,
    NgIconsModule.withIcons({
      heroTag,
      heroCheckCircle,
      heroChevronUp,
      heroChevronDown,
      heroMagnifyingGlass,
      heroUser,
      heroShoppingCart,
      heroXMark,
      heroArrowLeft,
      heroEye,
      heroEyeSlash,
      heroExclamationCircle,
      heroBars3,
      heroTrash,
      heroPlus,
      heroLockClosed,
      heroMinus,
      heroSquaresPlus,
      heroArrowUpTray,
      heroChevronLeft,
      heroChevronRight,
      heroEllipsisHorizontal,
      heroBoltSolid,
      heroInformationCircle,
      heroInformationCircleSolid,
      heroFolder,
      heroFolderOpen,
    }),
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      messageClass: 'text-paragraph',
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideStore(),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'product', reducer: productReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
