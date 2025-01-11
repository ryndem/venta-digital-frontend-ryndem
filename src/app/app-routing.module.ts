import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TempMainLayoutComponent } from './components/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/temp-auth-layout/temp-auth-layout.component';
import { TempQuoterLayoutComponent } from './components/temp-quoter-layout/temp-quoter-layout.component';


const routes: Routes = [
  
  {
    path: 'privacy-policy',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-privacy-policy/page-privacy-policy.module').then(m => m.PagePrivacyPolicyModule)
  },
  {
    path: 'terms-and-conditions',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-terms-and-conditions/page-terms-and-conditions.module').then(m => m.PageTermsAndConditionsModule)
  },
  {
    path: 'server-error',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-server-error/page-server-error.module').then(m => m.PageServerErrorModule)
  },  
  {
    path: '404',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: 'cart/thank-you',
    component: TempQuoterLayoutComponent,
    loadChildren: () => import('./pages/page-thank-you/page-thank-you.module').then(m => m.PageThankYouModule)
  },
  {
    path: 'cart/shopping-cart',
    component: TempQuoterLayoutComponent,
    loadChildren: () => import('./pages/page-shopping-cart/page-shopping-cart.module').then(m => m.PageShoppingCartModule)
  },
  {
    path: 'products',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-products/page-products.module').then(m => m.PageProductsModule)
  },
  {
    path: 'cart/quote-submission',
    component: TempQuoterLayoutComponent,
    loadChildren: () => import('./pages/page-quote-submission/page-quote-submission.module').then(m => m.PageQuoteSubmissionModule)
  },
  {
    path: 'auth/sign-up',
    component: TempAuthLayoutComponent,
    loadChildren: () => import('./pages/page-sign-up/page-sign-up.module').then(m => m.PageSignUpModule)
  },
  {
    path: 'verify',
    component: TempAuthLayoutComponent,
    loadChildren: () => import('./pages/page-account-activated/page-account-activated.module').then(m => m.PageAccountActivatedModule)
  },

  {
    path: 'reset-password',
    component: TempAuthLayoutComponent,
    loadChildren: () => import('./pages/page-reset-password/page-reset-password.module').then(m => m.PageResetPasswordModule)
  },
  {
    path: 'auth/forgot-password',
    component: TempAuthLayoutComponent,
    loadChildren: () => import('./pages/page-forgot-password/page-forgot-password.module').then(m => m.PageForgotPasswordModule)
  },
  {
    path: '',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-home/page-home.module').then(m => m.PageHomeModule)
  },
  {
    path: 'products/:productId',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-product-details/page-product-details.module').then(m => m.PageProductDetailsModule)
  },
  {
    path: 'orders',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-order-list/page-order-list.module').then(m => m.PageOrderListModule)
  },
  {
    path: 'orders/quotes/:quoteId',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-quote-details/page-quote-details.module').then(m => m.PageQuoteDetailsModule)
  },
  {
    path: 'orders/:orderId',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-order-details/page-order-details.module').then(m => m.PageOrderDetailsModule)
  },
  {
    path: 'orders/in-progress/created',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-purchase-order-created/page-purchase-order-created.module').then(m => m.PagePurchaseOrderCreatedModule)
  },
  {
    path: 'orders/in-progress/:purchaseOrderId',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-purchase-order-details/page-purchase-order-details.module').then(m => m.PagePurchaseOrderDetailsModule)
  },

  {
    path: 'orders/in-progress/creation',
    component: TempMainLayoutComponent,
    loadChildren: () => import('./pages/page-purchase-order-creation/page-purchase-order-creation.module').then(m => m.PagePurchaseOrderCreationModule)
  },  

  // ====================================================================== //

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
