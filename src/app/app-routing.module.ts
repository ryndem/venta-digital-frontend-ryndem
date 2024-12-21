import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TempMainLayoutComponent } from './components/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/temp-auth-layout/temp-auth-layout.component';
import { TempQuoterLayoutComponent } from './components/temp-quoter-layout/temp-quoter-layout.component';
import { PgHomeComponent } from './module-catalog/pg-home/pg-home.component';
import { PgProductDetailsComponent } from './module-catalog/pg-product-details/pg-product-details.component';
import { PgNotFoundComponent } from './module-catalog/pg-not-found/pg-not-found.component';
import { PgTermsAndConditionsComponent } from './module-catalog/pg-terms-and-conditions/pg-terms-and-conditions.component';
import { PgPrivacyPolicyComponent } from './module-catalog/pg-privacy-policy/pg-privacy-policy.component';
import { PgProductsComponent } from './module-catalog/pg-products/pg-products.component';
import { PgServerErrorComponent } from './module-catalog/pg-server-error/pg-server-error.component';
import { PgResetPasswordComponent } from './module-auth/pg-reset-password/pg-reset-password.component';
import { PgForgotPasswordComponent } from './module-auth/pg-forgot-password/pg-forgot-password.component';
import { PgSignUpComponent } from './module-auth/pg-sign-up/pg-sign-up.component';
import { PgAccountActivatedComponent } from './module-auth/pg-account-activated/pg-account-activated.component';


const routes: Routes = [
  
  {
    path: 'cart',
    component: TempQuoterLayoutComponent,
    loadChildren: () => import('./module-cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'orders',
    component: TempQuoterLayoutComponent,
    loadChildren: () => import('./module-orders/orders.module').then(m => m.OrdersModule)
  },

  {
    path: '',
    component: TempMainLayoutComponent,
    children: [
      { path: '', component: PgHomeComponent },
      { path: 'products', component: PgProductsComponent },
      { path: 'products/:productId', component: PgProductDetailsComponent },
      { path: 'terms-and-conditions', component: PgTermsAndConditionsComponent },
      { path: 'privacy-policy', component: PgPrivacyPolicyComponent },
    ],
  },
  {
    path: '',
    component: TempAuthLayoutComponent,
    children: [
      { path: 'reset-password', component: PgResetPasswordComponent },
      { path: 'auth/forgot-password', component: PgForgotPasswordComponent },
      { path: 'auth/sign-up', component: PgSignUpComponent },
      { path: 'verify', component: PgAccountActivatedComponent },
    ],
  },
  {
    path: '404',
    component: TempMainLayoutComponent,
    children: [{ path: '', component: PgNotFoundComponent }],
  },
  {
    path: 'server-error',
    component: TempMainLayoutComponent,
    children: [{ path: '', component: PgServerErrorComponent }],
  },  
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
