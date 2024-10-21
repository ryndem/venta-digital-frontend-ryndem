import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'atm-carousel-button',
  templateUrl: './atm-carousel-button.component.html',
  styleUrl: './atm-carousel-button.component.scss',
})
export class AtmCarouselButtonComponent {
  constructor(private store: Store<any>) {}

  @Input()
  index: number = 0;

  @Input()
  isActive: boolean = false;

  @Output()
  indexChangeEmitter = new EventEmitter<number>();

  onClick(): void {
    this.indexChangeEmitter.emit(this.index);
  }
}
