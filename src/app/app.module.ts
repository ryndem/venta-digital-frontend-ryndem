import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { heroBars3, heroChevronUp, heroChevronDown, heroExclamationCircle, heroEye, heroEyeSlash, heroLockClosed, heroMagnifyingGlass, heroMinus, heroPlus, heroShoppingCart, heroSquaresPlus, heroTag, heroTrash, heroUser, heroXMark, heroArrowUpTray, heroChevronLeft, heroChevronRight, heroEllipsisHorizontal } from '@ng-icons/heroicons/outline';

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
import { HomePageComponent } from './home-page/home-page.component';
import { UsdCurrencyPipe } from './pipes/usd-currency.pipe';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgProductsGridComponent } from './components/ui/org-products-grid/org-products-grid.component';
import { OrgCategoryCardComponent } from './components/ui/org-category-card/org-category-card.component';
import { OrgCategoriesGalleryComponent } from './components/ui/org-categories-gallery/org-categories-gallery.component';
import { AccountActivatedComponent } from './auth/account-activated/account-activated.component';
import { OrgHelpContactComponent } from './components/domain/org-help-contact/org-help-contact.component';
import { OrgCarouselComponent } from './components/ui/org-carousel/org-carousel.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { OrgProductDetailsCardComponent } from './components/domain/org-product-details-card/org-product-details-card.component';
import { OrgProductDetailsComponent } from './components/domain/org-product-details/org-product-details.component';
import { OrgRelatedProductsComponent } from './components/domain/org-related-products/org-related-products.component';
import { TempMainLayoutComponent } from './components/ui/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/ui/temp-auth-layout/temp-auth-layout.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AtmCategoryCardComponent } from './components/ui/atm-category-card/atm-category-card.component';
import { TermsAndConditionsPageComponent } from './terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { OrgCategoriesBarComponent } from './components/domain/org-categories-bar/org-categories-bar.component';
import { OrgMobileNavigationMenuComponent } from './components/ui/org-mobile-navigation-menu/org-mobile-navigation-menu.component';
import { OrgPagerComponent } from './components/ui/org-pager/org-pager.component';
import { MolCarouselItemComponent } from './components/ui/mol-carousel-item/mol-carousel-item.component';
import { AtmCarouselButtonComponent } from './components/ui/atm-carousel-button/atm-carousel-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutHeaderComponent,
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
    AccountActivatedComponent,
    OrgHelpContactComponent,
    OrgCarouselComponent,
    ProductDetailsPageComponent,
    OrgProductDetailsCardComponent,
    OrgProductDetailsComponent,
    OrgRelatedProductsComponent,
    TempMainLayoutComponent,
    TempAuthLayoutComponent,
    NotFoundPageComponent,
    AtmCategoryCardComponent,
    TermsAndConditionsPageComponent,
    PrivacyPolicyPageComponent,
    ProductsPageComponent,
    OrgCategoriesBarComponent,
    OrgMobileNavigationMenuComponent,
    OrgPagerComponent,
    MolCarouselItemComponent,
    AtmCarouselButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMasonryModule,
    NgIconsModule.withIcons(
      {
        heroTag,
        heroChevronUp,
        heroChevronDown,
        heroMagnifyingGlass,
        heroUser,
        heroShoppingCart,
        heroXMark,
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
        heroEllipsisHorizontal
      }
    )
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
