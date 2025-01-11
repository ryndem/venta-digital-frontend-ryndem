import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Carousel button component
 * @export
 * @class AtmCarouselButtonComponent
 */
@Component({
  selector: 'atm-carousel-button',
  templateUrl: './atm-carousel-button.component.html',
  styleUrls: ['./atm-carousel-button.component.scss'],
})
export class AtmCarouselButtonComponent {

  
  /**
   * Carousel item index
   */
  @Input()
  index = 0;

  /**
   * Bolean value to indicate if the carousel item is active
   */
  @Input()
  isActive = false;

  /**
   * Emitter for change index event
   */
  @Output()
  indexChangeEmitter = new EventEmitter<number>();


  /**
   * Method for carrousel item click event
   */
  onClick(): void {
    this.indexChangeEmitter.emit(this.index);
  }
}
