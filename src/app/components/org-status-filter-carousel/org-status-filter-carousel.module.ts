import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgStatusFilterCarouselComponent } from './org-status-filter-carousel.component';
import { MolCarouselButtonModule } from './mol-carousel-button/mol-carousel-button.module';
import { MolCarouselControlModule } from './mol-carousel-control/mol-carousel-control.module';

@NgModule({
  declarations: [OrgStatusFilterCarouselComponent],
  imports: [CommonModule, MolCarouselButtonModule, MolCarouselControlModule],
  exports: [OrgStatusFilterCarouselComponent],
})
export class OrgStatusFilterCarouselModule {}
