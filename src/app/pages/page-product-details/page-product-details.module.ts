import { NgModule } from '@angular/core';
import { PageProductDetailsRoutingModule } from './page-product-details-routing.module';
import { PgProductDetailsComponent } from './pg-product-details/pg-product-details.component';
import { OrgProductDetailsComponent } from './org-product-details/org-product-details.component';
import { CommonModule } from '@angular/common';
import { CatalogCommonsModule } from 'app/module-catalog-commons/catalog-commons.module';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { NgIconsModule } from '@ng-icons/core';
import { heroSquaresPlus } from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
    PgProductDetailsComponent,
    OrgProductDetailsComponent,
  ],
  imports: [
    PageProductDetailsRoutingModule,
    AppCommonsModule,
    CatalogCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroSquaresPlus,
    })
  ],
})
export class PageProductDetailsModule { }
