import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { Address } from 'app/model/address';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';
import { selectCurrentUser, selectUserAddresses } from 'app/store/selectors/user.selectors';

/**
 * Address selector component
 * @export
 * @class MolAddressSelectorComponent
 * @extends {AtmClosableComponent}
 */
@Component({
  selector: 'mol-address-selector',
  templateUrl: './mol-address-selector.component.html',
  styleUrls: ['./mol-address-selector.component.scss'],
})
export class MolAddressSelectorComponent extends AtmClosableComponent {

  /**
   * Allows 'Other' other address
   */
  @Input() otherAddressDisabled = false;

  /**
   * Needs confirmation on address change
   */
  @Input() needsConfirmation = false;

  
  /**
   * Initial address selected
   * @type {(string | null)}
   */
  @Input() selectedAddressId : string | null = null;

  /**
   * Address selected emitter
   */
  @Output() addressSelectedEmitter = new EventEmitter<Address>();

  /**
   * Selected 'Other' address emitter
   */
  @Output() selectedOtherEmitter = new EventEmitter();

  /**
   * Boolean to track if dropdown is opened
   */
  showAddresses = false;


  /**
   * Boolean to track the visibility of confirmation modal
   */
  showConfirmationModal = false;

  
  /**
   * Preselected address to show selected
   * @type {(Address | null)}
   */
  preSelectedAddress: Address | null = null;


  /**
   * Empty placeholder
   */
  selectionLabel = 'Elige una dirección de entrega';

  /**
  * Store reference (user.user))
  */
  user$: Observable<User | null>;

  /**
  * Store reference (user.addresses)
  */
  addresses$: Observable<Address[]>;

  /**
   * Creates an instance of MolAddressSelectorComponent.
   * @param {Store} store
   */
  constructor(private store: Store) {
    super();
    this.user$ = this.store.select(selectCurrentUser);
    this.addresses$ = this.store.select(selectUserAddresses);
    this.addresses$.subscribe( value => {
      this.initAddress(value);
    })
  }

  /**
   * Address selection valid getter
   * @readonly
   * @type {boolean}
   */
  get isAddressSelectionValid(): boolean {
    return this.selectionLabel !== 'Elige una dirección de entrega' && this.selectionLabel !== 'Solicitar entrega en otra dirección';
  }

  /**
   * Method overrided to close dropdown
   */
  override close() {
    this.showAddresses = false;
  }

  /**
   * Method to toggle drop down visibility
   */
  toggleShowAddresses() {
    this.showAddresses = !this.showAddresses;
  }

  /**
   * Init addresses list
   * @param {(Address[] | null)} addresses
   */
  initAddress(addresses: Address[] | null) {
    if (addresses && this.selectedAddressId) {
      const selected = addresses.find(a => a.idAddress == this.selectedAddressId);
      if( selected )
        this.selectionLabel = selected.address || '';
    }
  }

  /**
   * Method to handle select address action checking confirmation
   * @param {(Address | null)} selected
   * @return {*} 
   */
  selectAddress(selected: Address | null ) {
    this.preSelectedAddress = selected;
    this.toggleShowAddresses();

    if(this.needsConfirmation) {
      this.showConfirmationModal = true;
      return;
    }

    this.confirmSelection();
  }

  /**
   * Method to confirm selection
   */
  confirmSelection() {
    if(this.preSelectedAddress) {
      this.selectOption(this.preSelectedAddress);
    } else {
      this.selectOther();
    }
    this.showConfirmationModal = false;
  }

  /**
   * Method to select the address after confirmation 
   * @param {Address} address
   */
  selectOption(address: Address) {
    this.addressSelectedEmitter.emit(address);
    this.selectionLabel = address.address || '';
  }

  /**
   * Mehod to select 'Other' Address
   */
  selectOther() {
    this.selectedOtherEmitter.emit();
    this.selectionLabel = 'Solicitar entrega en otra dirección';
  }
}
