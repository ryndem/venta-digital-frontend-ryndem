import { Component, Input } from '@angular/core';
import { CarouselItem } from 'app/model/carousel-item';

@Component({
  selector: 'mol-carousel-item',
  templateUrl: './mol-carousel-item.component.html',
  styleUrls: ['./mol-carousel-item.component.scss'],
})
export class MolCarouselItemComponent {
  @Input()
  item: CarouselItem | null = null;

  @Input()
  isActive = false;
}
