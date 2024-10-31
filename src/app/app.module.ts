import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroBars3,
  heroCheckCircle,
  heroChevronUp,
  heroChevronDown,
  heroExclamationCircle,
  heroArrowLeft,
  heroEye,
  heroEyeSlash,
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
  heroArrowUpTray,
  heroChevronLeft,
  heroChevronRight,
  heroEllipsisHorizontal,
  heroInformationCircle,
} from '@ng-icons/heroicons/outline';
import  { heroBoltSolid } from "@ng-icons/heroicons/solid"

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
import { LoginModalComponent } from './components/domain/org-login-modal/org-login-modal.component';
import { ProductCardComponent } from './components/domain/org-product-card/org-product-card.component';
import { ShoppingButtonComponent } from './components/domain/atm-shopping-button/atm-shopping-button.component';
import { FooterComponent } from './components/ui/org-footer/org-footer.component';
import { NavButtonComponent } from './components/ui/mol-nav-button/mol-button.component';
import { InfoCardComponent } from './components/ui/org-info-card/org-info-card.component';
import { LayoutFooterComponent } from './components/ui/org-layout-footer/org-layout-footer.component';
import { LayoutHeaderComponent } from './components/ui/org-layout-header/org-layout-header.component';
import { LayoutSearchComponent } from './components/ui/org-layout-search/org-layout-search.component';
import { NavigationMenuComponent } from './components/ui/org-navigation-menu/org-navigation-menu.component';
import { SplitScreenComponent } from './components/ui/org-split-screen/org-split-screen.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsdCurrencyPipe } from './pipes/usd-currency.pipe';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgProductsGridComponent } from './components/ui/org-products-grid/org-products-grid.component';
import { OrgCategoryCardComponent } from './components/ui/org-category-card/org-category-card.component';
import { OrgCategoriesGalleryComponent } from './components/ui/org-categories-gallery/org-categories-gallery.component';
import { AccountActivatedComponent } from './auth/account-activated/account-activated.component';
import { OrgHelpContactComponent } from './components/domain/org-help-contact/org-help-contact.component';
import { OrgCarouselComponent } from './components/ui/org-carousel/org-carousel.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { OrgProductDetailsCardComponent } from './components/domain/org-product-details-card/org-product-details-card.component';
import { OrgProductDetailsComponent } from './components/domain/org-product-details/org-product-details.component';
import { OrgRelatedProductsComponent } from './components/domain/org-related-products/org-related-products.component';
import { TempMainLayoutComponent } from './components/ui/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/ui/temp-auth-layout/temp-auth-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AtmCategoryCardComponent } from './components/ui/atm-category-card/atm-category-card.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrgCategoriesBarComponent } from './components/domain/org-categories-bar/org-categories-bar.component';
import { OrgMobileNavigationMenuComponent } from './components/ui/org-mobile-navigation-menu/org-mobile-navigation-menu.component';
import { OrgPagerComponent } from './components/ui/org-pager/org-pager.component';
import { MolCarouselItemComponent } from './components/ui/mol-carousel-item/mol-carousel-item.component';
import { AtmCarouselButtonComponent } from './components/ui/atm-carousel-button/atm-carousel-button.component';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { userReducer } from './store/users/user.reducer';
import { AtmLoaderComponent } from './components/ui/atm-loader/atm-loader.component';
import { productReducer } from './store/products/product.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { QuotesPageComponent } from './pages/quotes-page/quotes-page.component';
import { OrgQuotesDescriptionComponent } from './components/ui/org-quotes-description/org-quotes-description.component';
import { QuoteCartPageComponent } from './pages/quote-cart-page/quote-cart-page.component';
import { QuoteSubmissionPageComponent } from './pages/quote-submission-page/quote-submission-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { TempQuoterLayoutComponent } from './components/ui/temp-quoter-layout/temp-quoter-layout.component';
import { LayoutQuoterHeaderComponent } from './components/ui/org-layout-quoter-header/org-layout-quoter-header.component';
import { OrgQuotesListComponent } from './components/ui/org-quotes-list/org-quotes-list.component';
import { OrgQuoteCardComponent } from './components/domain/org-quote-card/org-quote-card.component';
import { QuoteDetailsPageComponent } from './pages/quote-details-page/quote-details-page.component';
import { OrgQuoteProductCardComponent } from './components/domain/org-quote-product-card/org-quote-product-card.component';
import { OrgQuoteCardDetailComponent } from './components/domain/org-quote-card-detail/org-quote-card-detail.component';
import { OrgQuoteSummaryCardComponent } from './components/domain/org-quote-summary-card/org-quote-summary-card.component';
import { AtmFeaturedProductModalComponent } from './components/ui/atm-featured-product-modal/atm-featured-product-modal.component';
import { OrgQuoteUserInfoComponent } from './components/domain/org-quote-user-info/org-quote-user-info.component';
import { OrgQuoteTotalsComponent } from './components/domain/org-quote-totals/org-quote-totals.component';
import { AtmAuthBannerComponent } from './components/ui/atm-auth-banner/atm-auth-banner.component';
import { MolAddressSelectorComponent } from './components/ui/mol-address-selector/mol-address-selector.component';
import { MolUserMenuComponent } from './components/ui/mol-user-menu/mol-user-menu.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutHeaderComponent,
    LayoutQuoterHeaderComponent,
    NavButtonComponent,
    LayoutSearchComponent,
    LayoutFooterComponent,
    NavigationMenuComponent,
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
    OrgQuotesListComponent,
    OrgQuotesDescriptionComponent,
    OrgQuoteCardComponent,
    OrgQuoteProductCardComponent,
    AccountActivatedComponent,
    OrgHelpContactComponent,
    OrgCarouselComponent,
    ProductDetailsPageComponent,
    QuotesPageComponent,
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
    QuoteCartPageComponent,
    QuoteSubmissionPageComponent,
    ThankYouPageComponent,
    OrgCategoriesBarComponent,
    OrgMobileNavigationMenuComponent,
    OrgPagerComponent,
    MolCarouselItemComponent,
    AtmCarouselButtonComponent,
    AtmLoaderComponent,
    OrgQuoteCardDetailComponent,
    OrgQuoteUserInfoComponent,
    OrgQuoteTotalsComponent,
    OrgQuoteSummaryCardComponent,
    MolAddressSelectorComponent,
    AtmFeaturedProductModalComponent,
    AtmAuthBannerComponent,
    MolUserMenuComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMasonryModule,
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
      heroInformationCircle
    }),
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      messageClass: 'text-body-medium '
    })
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    provideStore(),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'product', reducer: productReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
