import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroBars3,
  heroChevronDown,
  heroExclamationCircle,
  heroMagnifyingGlass,
  heroShoppingCart,
  heroTag,
  heroUser,
  heroXMark,
  heroArrowUpTray
} from '@ng-icons/heroicons/outline';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
import { OrgFooterComponent } from './components/org-footer/org-footer.component';
import { MolNavButtonComponent } from './components/mol-nav-button/mol-nav-button.component';
import { OrgInfoCardComponent } from './components/org-info-card/org-info-card.component';
import { OrgLayoutFooterComponent } from './components/org-layout-footer/org-layout-footer.component';
import { OrgLayoutHeaderComponent } from './components/org-layout-header/org-layout-header.component';
import { OrgLayoutSearchComponent } from './components/org-layout-search/org-layout-search.component';
import { OrgSplitScreenComponent } from './components/org-split-screen/org-split-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TempMainLayoutComponent } from './components/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/temp-auth-layout/temp-auth-layout.component';
import { OrgMobileNavigationMenuComponent } from './components/org-mobile-navigation-menu/org-mobile-navigation-menu.component';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { productReducer } from './store/reducers/product.reducer';
import { cartReducer } from './store/reducers/cart.reducer';
import { TempQuoterLayoutComponent } from './components/temp-quoter-layout/temp-quoter-layout.component';
import { OrgLayoutQuoterHeaderComponent } from './components/org-layout-quoter-header/org-layout-quoter-header.component';

import { MolUserMenuComponent } from './components/mol-user-menu/mol-user-menu.component';
import { MolActiveOrderBannerComponent } from './components/mol-active-order-banner/mol-active-order-banner.component';
import { MolCategoryMenuComponent } from './components/mol-category-menu/mol-category-menu.component';
import { AppCommonsModule } from './module-app-commons/app-commons.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { CartEffects } from './store/effects/cart.effects';
import { UserEffects } from './store/effects/user.effects';
import { PagePrivacyPolicyModule } from './pages/page-privacy-policy/page-privacy-policy.module';
import { PageTermsAndConditionsModule } from './pages/page-terms-and-conditions/page-terms-and-conditions.module';
import { CatalogCommonsModule } from './module-catalog-commons/catalog-commons.module';
import { orderReducer } from './store/reducers/order.reducer';
import { viewReducer } from './store/reducers/view.reducer';
import { OrderEffects } from './store/effects/order.effects';

registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,

    OrgLayoutHeaderComponent,
    OrgLayoutQuoterHeaderComponent,
    OrgLayoutFooterComponent,
    OrgLayoutSearchComponent,

    MolActiveOrderBannerComponent,
    MolUserMenuComponent,
    MolCategoryMenuComponent,
    MolNavButtonComponent,

    TempMainLayoutComponent,
    TempAuthLayoutComponent,
    TempQuoterLayoutComponent,

    OrgMobileNavigationMenuComponent,
    OrgFooterComponent,
    OrgSplitScreenComponent,
    OrgInfoCardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppCommonsModule,
    CatalogCommonsModule,

    // ============================ PAGES ============================ //
    PagePrivacyPolicyModule,
    PageTermsAndConditionsModule,

    // ============================ ===== ============================//
    EffectsModule.forRoot([ProductEffects, CartEffects, UserEffects, OrderEffects]),

    NgIconsModule.withIcons({
      heroArrowUpTray,
      heroBars3,
      heroChevronDown,
      heroExclamationCircle,
      heroMagnifyingGlass,
      heroShoppingCart,
      heroTag,
      heroUser,
      heroXMark
    }),
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      messageClass: 'text-paragraph'
    })
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
    provideState({ name: 'view', reducer: viewReducer }),
    provideState({ name: 'order', reducer: orderReducer }),
    { provide: LOCALE_ID,  useValue: 'es'}
  ],
  bootstrap: [AppComponent],

})

export class AppModule {}
