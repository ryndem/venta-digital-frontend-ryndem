import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { OrgOrderTotalsComponent } from './org-order-totals/org-order-totals.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    OrgOrderTotalsComponent
  ],
  imports: [
    AppCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
    }),
  ],
  exports: [
    OrgOrderTotalsComponent
  ]
})
export class OrderCommonsModule { }
