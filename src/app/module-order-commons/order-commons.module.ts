import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { OrgOrderTotalsComponent } from './org-order-totals/org-order-totals.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { OrgOrderQuoteCardComponent } from './org-order-quote-card/org-order-quote-card.component';
import { OrgOrderItemCardComponent } from './org-order-item-card/org-order-item-card.component';
import { heroFolder, heroFolderOpen } from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
    OrgOrderTotalsComponent,
    OrgOrderQuoteCardComponent,
    OrgOrderItemCardComponent,
  ],
  imports: [
    AppCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroFolder,
      heroFolderOpen,
    }),
  ],
  exports: [
    OrgOrderTotalsComponent,
    OrgOrderQuoteCardComponent
  ]
})
export class OrderCommonsModule { }
