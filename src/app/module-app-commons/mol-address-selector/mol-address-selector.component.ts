import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

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
  addressSelectedEmitter = new EventEmitter<Address>();

  @Output()
  selectedOtherEmitter = new EventEmitter();


  showAddresses = false;
  showConfirmationModal = false;
  preSelectedAddress: Address | null = null;
  selectionLabel = 'Elige una dirección de entrega';

  user$: Observable<User | null> = this.store.select(state => state.user.user);
  addresses$: Observable<Address[] | null> = this.store.select(state => state.user.addresses);

  constructor(private store: Store<{ user: UserState }>) {
    super();
    this.addresses$.subscribe( value => {
      this.initAddress(value);
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

  initAddress(addresses: Address[] | null) {
    if (addresses && this.selectedAddressId) {
      const selected = addresses.find(a => a.idAddress == this.selectedAddressId);
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
