import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'atm-quantity-selector',
  templateUrl: './atm-quantity-selector.component.html',
  styleUrls: ['./atm-quantity-selector.component.scss']
})
export class AtmQuantitySelectorComponent {
  @Input() quantity = 1;
  @Input() disabled = false;
  @Input() cartMode = true;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();

  isTextFocused = false;
  private quantityInput$ = new Subject<number>();

  constructor(
    private notificationService: NotificationService,
  ) {
    this.quantityInput$
      .pipe(debounceTime(600))
      .subscribe((value) => this.updateQuantity(value));
  }

  onFocus( isOnFocus: boolean) {
    if(isOnFocus) {
      this.isTextFocused = isOnFocus;
    } else {
      setTimeout(() => {
        this.isTextFocused = isOnFocus;
      }, 400);
    }
  }
  minus(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }

    if (this.quantity <= 1) {
      this.removeItem.emit();
    }
  }

  plus(): void {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.value) {
      const numericValue = Number(inputElement.value);
      this.quantityInput$.next(numericValue);
    }
  }

  private updateQuantity(value: number): void {
    if (!Number.isInteger(value)) {
      this.notificationService.showError("El valor a ingresar debe ser un número entero");
    }

    if (value < 1) {
      this.quantity = 1;
    }

    this.quantityChange.emit(this.quantity);
  }
}
