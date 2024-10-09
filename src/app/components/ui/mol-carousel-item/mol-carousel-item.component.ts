import { Component, Input } from '@angular/core';
import { CarouselItem } from './carousel-image';

@Component({
  selector: 'mol-carousel-item',
  templateUrl: './mol-carousel-item.component.html',
  styleUrl: './mol-carousel-item.component.scss'
})
export class MolCarouselItemComponent {

  @Input()
  item: CarouselItem | null = null;

  @Input()
  isActive: boolean = false;

}
