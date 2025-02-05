import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { showErrorNotification } from 'app/store/actions/view.actions';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Component to select quantity for products
 * @export
 * @class AtmQuantitySelectorComponent
 */
@Component({
  selector: 'atm-quantity-selector',
  templateUrl: './atm-quantity-selector.component.html',
  styleUrls: ['./atm-quantity-selector.component.scss']
})
export class AtmQuantitySelectorComponent {

  /**
   * Product quantity
   */
  @Input() quantity = 1;

  /**
   * Flag to diable the input
   * @type {(boolean | null)}
   */
  @Input() disabled: boolean | null = false;

  /**
   * Flag to allow product deletion
   */
  @Input() cartMode = true;

  /**
   * Quantity change event emitter
   */
  @Output() quantityChange = new EventEmitter<number>();

  /**
   * Remove item event emitter
   */
  @Output() removeItem = new EventEmitter<void>();

  /**
   * Flag to identify if the field is focused
   */
  isTextFocused = false;

  /**
   * Quantity input subject to debounce changes
   * @private
   */
  private quantityInput$ = new Subject<number>();

  /**
   * Creates an instance of AtmQuantitySelectorComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store,
  ) {
    this.quantityInput$
      .pipe(debounceTime(600))
      .subscribe((value) => this.updateQuantity(value));
  }

  /**
   * Quantity input onFocus Listener
   * @param {boolean} isOnFocus
   */
  onFocus( isOnFocus: boolean) {
    if(isOnFocus) {
      this.isTextFocused = isOnFocus;
    } else {
      setTimeout(() => {
        this.isTextFocused = isOnFocus;
      }, 600);
    }
  }

  /**
   * Method to decrease product quantity
   */
  minus(): void {
    if (this.quantity <= 1) {
      this.removeItem.emit();
    }

    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }

  }

  /**
   * Method to increase product quantity
   */
  plus(): void {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  /**
   * Quantity input onChange listener
   * @param {Event} event
   */
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.value) {
      const numericValue = Number(inputElement.value);
      this.quantityInput$.next(numericValue);
    }
  }

  /**
   * Method to update product quantity
   * @private
   * @param {number} value
   */
  private updateQuantity(value: number): void {
    if (!Number.isInteger(value)) { 
      this.store.dispatch(showErrorNotification({ message: 'El valor a ingresar debe ser un número entero'}));
    }

    if (value < 1) {
      this.quantity = 1;
    }

    this.quantityChange.emit(this.quantity);
  }
}
