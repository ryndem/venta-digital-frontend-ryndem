import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atm-carousel-button',
  templateUrl: './atm-carousel-button.component.html',
  styleUrls: ['./atm-carousel-button.component.scss'],
})
export class AtmCarouselButtonComponent {

  @Input()
  index = 0;

  @Input()
  isActive = false;

  @Output()
  indexChangeEmitter = new EventEmitter<number>();

  onClick(): void {
    this.indexChangeEmitter.emit(this.index);
  }
}
