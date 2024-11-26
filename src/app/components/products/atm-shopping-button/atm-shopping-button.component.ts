import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { Product } from 'app/model/product';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'atm-shopping-button',
  templateUrl: './atm-shopping-button.component.html',
  styleUrls: ['./atm-shopping-button.component.scss'],
})
export class ShoppingButtonComponent {
  @Input()
  product!: Product;

  isAddingToCar = false;
  isLogged = false;

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
      this.isAddingToCar = state.cart.isLoading;
    });
  }

  async addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (!this.isLogged) {
        this.authService.openLoginModal();
        return;
      }

      await this.cartService.addProduct(this.product, 1);
    } catch (error:any) {
      console.error(error);
    }
    this.isAddingToCar = false;
  }
}
