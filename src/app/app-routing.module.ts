import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AccountActivatedComponent } from './auth/account-activated/account-activated.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { TempMainLayoutComponent } from './components/ui/temp-main-layout/temp-main-layout.component';
import { TempAuthLayoutComponent } from './components/ui/temp-auth-layout/temp-auth-layout.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TermsAndConditionsPageComponent } from './terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: TempMainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'products/:productId', component: ProductDetailsPageComponent },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsPageComponent,
      },
      { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
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
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
