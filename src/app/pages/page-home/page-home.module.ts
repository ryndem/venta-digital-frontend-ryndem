import { NgModule } from '@angular/core';
import { PageHomeRoutingModule } from './page-home-routing.module';
import { AppCommonsModule } from 'app/module-app-commons/app-commons.module';
import { CommonModule } from '@angular/common';
import { PgHomeComponent } from './pg-home/pg-home.component';
import { CatalogCommonsModule } from 'app/module-catalog-commons/catalog-commons.module';
import { OrgCarouselComponent } from './org-carousel/org-carousel.component';
import { MolCarouselItemComponent } from './mol-carousel-item/mol-carousel-item.component';
import { AtmCarouselButtonComponent } from './atm-carousel-button/atm-carousel-button.component';
import { OrgCategoriesGalleryComponent } from './org-categories-gallery/org-categories-gallery.component';
import { OrgCategoryCardComponent } from './org-category-card/org-category-card.component';


@NgModule({
  declarations: [
    PgHomeComponent,
    OrgCarouselComponent,
    OrgCategoriesGalleryComponent,
    OrgCategoryCardComponent,
    MolCarouselItemComponent,
    AtmCarouselButtonComponent
  ],
  imports: [
    PageHomeRoutingModule,
    AppCommonsModule,
    CatalogCommonsModule,
    CommonModule
  ]
})

export class PageHomeModule { }
