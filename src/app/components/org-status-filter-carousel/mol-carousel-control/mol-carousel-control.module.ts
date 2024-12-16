import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MolCarouselControlComponent } from './mol-carousel-control.component';
import { NgIcon } from '@ng-icons/core';

@NgModule({
  declarations: [MolCarouselControlComponent],
  exports: [MolCarouselControlComponent],
  imports: [CommonModule, NgIcon],
})
export class MolCarouselControlModule {}
