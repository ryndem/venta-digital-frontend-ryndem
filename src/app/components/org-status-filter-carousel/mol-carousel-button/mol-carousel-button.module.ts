import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MolCarouselButtonComponent } from './mol-carousel-button.component';

@NgModule({
  declarations: [MolCarouselButtonComponent],
  exports: [MolCarouselButtonComponent],
  imports: [CommonModule],
})
export class MolCarouselButtonModule {}
