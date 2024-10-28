import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atm-featured-product-modal',
  templateUrl: './atm-featured-product-modal.component.html',
  styleUrl: './atm-featured-product-modal.component.scss'
})
export class AtmFeaturedProductModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
