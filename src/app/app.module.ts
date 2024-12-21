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

import { CatalogModule } from './module-catalog/catalog.module';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './module-auth/auth-interceptor';
import { AuthService } from './module-auth/auth.service';
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
import { CartModule } from './module-cart/cart.module';
import { AppCommonsModule } from './module-app-commons/app-commons.module';
import { OrdersModule } from './module-orders/orders.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PgAccountActivatedComponent } from './module-auth/pg-account-activated/pg-account-activated.component';
import { PgForgotPasswordComponent } from './module-auth/pg-forgot-password/pg-forgot-password.component';
import { PgResetPasswordComponent } from './module-auth/pg-reset-password/pg-reset-password.component';
import { PgSignUpComponent } from './module-auth/pg-sign-up/pg-sign-up.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';

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

    PgSignUpComponent,
    PgResetPasswordComponent,
    PgForgotPasswordComponent,
    PgAccountActivatedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppCommonsModule,
    CartModule,
    CatalogModule,
    OrdersModule,

    EffectsModule.forRoot([ProductEffects]),

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
    { provide: LOCALE_ID,  useValue: 'es'}
  ],
  bootstrap: [AppComponent],

})

export class AppModule {}
