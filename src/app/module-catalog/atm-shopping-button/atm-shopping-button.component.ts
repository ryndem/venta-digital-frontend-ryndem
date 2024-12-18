import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Product } from 'app/model/product';
import { CartService } from 'app/services/cart.service';
import { ShoppingCartState } from 'app/store/cart/cart.reducer';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'atm-shopping-button',
  templateUrl: './atm-shopping-button.component.html',
  styleUrls: ['./atm-shopping-button.component.scss'],
})
export class AtmShoppingButtonComponent {
  @Input()
  product!: Product;

  isAuthenticated = false;
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged)

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>,
  ) { 
    this.isLogged$.subscribe(value => {
      this.isAuthenticated = value;
    })
  }

  async addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (!this.isAuthenticated) {
        this.authService.openLoginModal();
        return;
      }

      await this.cartService.addProduct(this.product, 1);
    } catch (error) {
      console.error(error);
    }
  }
}
