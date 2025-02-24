import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgPrivacyPolicyComponent } from './pg-privacy-policy/pg-privacy-policy.component';

const routes: Routes = [
  { path: '', component: PgPrivacyPolicyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePrivacyPolicyRoutingModule { }
