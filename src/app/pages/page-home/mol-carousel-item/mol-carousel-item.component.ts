import { Component, Input } from '@angular/core';
import { CarouselItem } from 'app/model-props/carousel-item';

/**
 * Component to show Carousel Item
 * @export
 * @class MolCarouselItemComponent
 */
@Component({
  selector: 'mol-carousel-item',
  templateUrl: './mol-carousel-item.component.html',
  styleUrls: ['./mol-carousel-item.component.scss'],
})
export class MolCarouselItemComponent {
  
  /**
   * Carousel Item to show
   * @type {(CarouselItem | null)}
   */
  @Input() item: CarouselItem | null = null;

  /**
   * Boolean to indicate if the carousel item is active
   */
  @Input() isActive = false;
}
