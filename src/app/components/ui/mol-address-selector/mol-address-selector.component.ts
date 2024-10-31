import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClosableComponent } from 'app/components/commons/closable.component';
import { Address } from 'app/model/address';

@Component({
  selector: 'mol-address-selector',
  templateUrl: './mol-address-selector.component.html',
  styleUrl: './mol-address-selector.component.scss',
})
export class MolAddressSelectorComponent extends ClosableComponent {

  @Output()
  addressSelectedEmitter = new EventEmitter<Address|null>();
  
  @Output()
  selectedOtherEmitter = new EventEmitter();
  
  
  showAddresses: boolean = false;
  addresses: Address[] | null = null;
  selectionLabel:string = 'Elige una dirección de entrega';

  constructor(private store: Store<any>) {
    super();
    this.store.subscribe( state => {
      this.addresses = state.user.addresses;
    })
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
