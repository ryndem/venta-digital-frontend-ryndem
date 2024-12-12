import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mol-carousel-button',
  templateUrl: './mol-carousel-button.component.html',
  styleUrls: ['./mol-carousel-button.component.scss'],
})
export class MolCarouselButtonComponent {
  @Input() text!: string;
  @Input() isSelected!: boolean;
  @Output() clickEmitter: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    console.warn('Click');
    this.clickEmitter.emit();
  }
}
