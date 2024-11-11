import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AccountActivatedComponent } from './auth/account-activated/account-activated.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { TempMainLayoutComponent } from './components/ui/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/ui/temp-auth-layout/temp-auth-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { QuotesPageComponent } from './pages/quotes-page/quotes-page.component';
import { TempQuoterLayoutComponent } from './components/ui/temp-quoter-layout/temp-quoter-layout.component';
import { QuoteCartPageComponent } from './pages/quote-cart-page/quote-cart-page.component';
import { QuoteDetailsPageComponent } from './pages/quote-details-page/quote-details-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { QuoteSubmissionPageComponent } from './pages/quote-submission-page/quote-submission-page.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { OrderCreationPageComponent } from './pages/order-creation-page/order-creation-page.component';
import { PurchaseOrderDetailsPageComponent } from './pages/purchase-order-details-page/purchase-order-details-page.component';
import { PurchaseOrderCreatedPageComponent } from './pages/purchase-order-created-page/purchase-order-created-page.component';

const routes: Routes = [
  {
    path: '',
    component: TempMainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'products/:productId', component: ProductDetailsPageComponent },
      { path: 'quotes', component: QuotesPageComponent },
      { path: 'quotes/:quoteId', component: QuoteDetailsPageComponent },
      { path: 'purchase-orders/created', component: PurchaseOrderCreatedPageComponent },
      { path: 'purchase-orders/:purchaseOrderId', component: PurchaseOrderDetailsPageComponent },
      { path: 'orders/creation', component: OrderCreationPageComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsPageComponent },
      { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
    ],
  },
  {
    path: '',
    component: TempQuoterLayoutComponent,
    children: [
      { path: 'quote-cart', component: QuoteCartPageComponent },
      { path: 'quote-submission', component: QuoteSubmissionPageComponent },
      { path: 'thank-you', component: ThankYouPageComponent },
    ],
  },
  {
    path: 'auth',
    component: TempAuthLayoutComponent,
    children: [
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'verify', component: AccountActivatedComponent },
    ],
  },
  {
    path: '404',
    component: TempMainLayoutComponent,
    children: [{ path: '', component: NotFoundPageComponent }],
  },
  {
    path: 'server-error',
    component: TempMainLayoutComponent,
    children: [{ path: '', component: ServerErrorComponent }],
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
