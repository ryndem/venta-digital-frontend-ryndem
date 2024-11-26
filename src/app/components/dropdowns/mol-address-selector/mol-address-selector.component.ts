import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/components/commons/atm-closable/atm-closable.component';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';

@Component({
  selector: 'mol-address-selector',
  templateUrl: './mol-address-selector.component.html',
  styleUrls: ['./mol-address-selector.component.scss'],
})
export class MolAddressSelectorComponent extends AtmClosableComponent {

  @Input()
  otherAddressDisabled = false;

  @Input()
  needsConfirmation = false;

  @Input()
  selectedAddressId : string | null = null;

  @Output()
  addressSelectedEmitter = new EventEmitter<Address|null>();

  @Output()
  selectedOtherEmitter = new EventEmitter();


  showAddresses = false;
  showConfirmationModal = false;
  addresses: Address[] | null = null;
  preSelectedAddress: Address | null = null;

  selectionLabel = 'Elige una dirección de entrega';
  user: User | null = null;

  constructor(private store: Store<any>) {
    super();
    this.store.subscribe( state => {
      this.user = state.user.user;
      this.addresses = state.user.addresses;
      this.initAddress();
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

  initAddress() {
    if (this.addresses && this.selectedAddressId) {
      const selected = this.addresses.find(a => a.idAddress == this.selectedAddressId);
      if( selected )
        this.selectionLabel = selected.address || '';
    }
  }

  selectAddress(selected: Address | null ) {
    this.preSelectedAddress = selected;
    this.toggleShowAddresses();

    if(this.needsConfirmation) {
      this.showConfirmationModal = true;
      return;
    }

    this.confirmSelection();
  } 
  
  confirmSelection() {
    if(this.preSelectedAddress) {
      this.selectOption(this.preSelectedAddress);
    } else {
      this.selectOther();
    }
    this.showConfirmationModal = false;
  }

  selectOption(address: Address) {
    this.addressSelectedEmitter.emit(address);
    this.selectionLabel = address.address || '';
  }

  selectOther() {

    this.selectedOtherEmitter.emit();
    this.selectionLabel = 'Solicitar entrega en otra dirección';
  }
}
