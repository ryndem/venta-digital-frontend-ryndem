import { NgModule } from '@angular/core';
import { PgProductsComponent } from './pg-products/pg-products.component';
import { PageProductsRoutingModule } from './page-products-routing.module';
import { CatalogCommonsModule } from 'app/module-catalog-commons/catalog-commons.module';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronDown, heroChevronLeft, heroChevronUp, heroEllipsisHorizontal } from '@ng-icons/heroicons/outline';
import { OrgCategoriesBarComponent } from './org-categories-bar/org-categories-bar.component';
import { OrgPagerComponent } from './org-pager/org-pager.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PgProductsComponent,
    OrgCategoriesBarComponent,
    OrgPagerComponent,
  ],
  imports: [
    PageProductsRoutingModule,
    AppCommonsModule,
    CatalogCommonsModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroChevronUp,
      heroChevronDown,
      heroChevronLeft,
      heroEllipsisHorizontal
    })
  ]
})
export class PageProductsModule { }
