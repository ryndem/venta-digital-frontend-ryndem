import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Modal component with close button
 * @export
 * @class AtmClosableModalComponent
 */
@Component({
  selector: 'atm-closable-modal',
  templateUrl: './atm-closable-modal.component.html',
  styleUrls: ['./atm-closable-modal.component.scss']
})
export class AtmClosableModalComponent {

  /**
   * Boolean to indicate if the modal is opened
   */
  @Input() isOpen = false;

  /**
   * Emitter for close modal event
   */
  @Output() modalClosedEmitter = new EventEmitter<void>();

  
  /**
   * Method to close modal
   */
  closeModal() {
    this.isOpen = false;
    this.modalClosedEmitter.emit();
  }
}
