import { NgModule } from '@angular/core';
import { PgOrderListComponent } from './pg-order-list/pg-order-list.component';
import { PageOrderListRoutingModule } from './page-order-list-routing.module';
import { OrgQuotesDescriptionComponent } from './org-quotes-description/org-quotes-description.component';
import { OrgQuoteOrderListComponent } from './org-quote-order-list/org-quote-order-list.component';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgOrderElementCardComponent } from './org-order-element-card/org-order-element-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
    PgOrderListComponent,
    OrgOrderElementCardComponent,
    OrgQuotesDescriptionComponent,
    OrgQuoteOrderListComponent,
  ],
  imports: [
    PageOrderListRoutingModule,
    AppCommonsModule,
    CommonModule,
    FormsModule,

    NgIconsModule.withIcons({
      heroChevronDown,
    })
  ]
})

export class PageOrderListModule { }
