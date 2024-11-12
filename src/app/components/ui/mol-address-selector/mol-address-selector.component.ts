import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClosableComponent } from 'app/components/commons/closable.component';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

@Component({
  selector: 'mol-address-selector',
  templateUrl: './mol-address-selector.component.html',
  styleUrls: ['./mol-address-selector.component.scss'],
})
export class MolAddressSelectorComponent extends ClosableComponent {

  @Input()
  otherAddressDisabled = false;

  @Output()
  addressSelectedEmitter = new EventEmitter<Address|null>();

  @Output()
  selectedOtherEmitter = new EventEmitter();


  showAddresses = false;
  addresses: Address[] | null = null;
  selectionLabel = 'Elige una dirección de entrega';
  user: User | null = null;

  constructor(private store: Store<any>) {
    super();
    this.store.subscribe( state => {
      this.addresses = state.user.addresses;
      this.user = state.user.user;
    })
  }

  get isAddressSelectionValid(): boolean {
    return this.selectionLabel !== 'Elige una dirección de entrega' && this.selectionLabel !== 'Solicitar entrega en otra dirección';
  }

  override close() {
    this.showAddresses = false;
  }

  toggleShowAddresses() {
    this.showAddresses = !this.showAddresses;
  }

  selectOption(selected: Address) {
    this.addressSelectedEmitter.emit(selected);
    this.selectionLabel = selected.address || '';
    this.toggleShowAddresses();
  }

  selectOther() {
    this.selectedOtherEmitter.emit();
    this.selectionLabel = 'Solicitar entrega en otra dirección';
    this.toggleShowAddresses();
  }
}
