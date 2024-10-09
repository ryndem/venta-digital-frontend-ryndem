import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atm-carousel-button',
  templateUrl: './atm-carousel-button.component.html',
  styleUrl: './atm-carousel-button.component.scss'
})
export class AtmCarouselButtonComponent {

  @Input()
  index: number = 0;

  @Input()
  isActive: boolean = false;

  @Output()
  indexChangeEmitter = new EventEmitter<number>();

  onClick() : void {
    this.indexChangeEmitter.emit(this.index);
  }

}
