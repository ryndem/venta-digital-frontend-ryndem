import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atm-closable-modal',
  templateUrl: './atm-closable-modal.component.html',
  styleUrls: ['./atm-closable-modal.component.scss']
})
export class AtmClosableModalComponent {
  @Input() isOpen = false;
  @Output() modalClosedEmitter = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.modalClosedEmitter.emit();
  }
}
