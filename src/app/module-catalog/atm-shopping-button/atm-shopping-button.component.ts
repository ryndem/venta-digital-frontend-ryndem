import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Product } from 'app/model/product';
import { CartService } from 'app/services/cart.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

/**
 * Add to cart button
 * @export
 * @class AtmShoppingButtonComponent
 */
@Component({
  selector: 'atm-shopping-button',
  templateUrl: './atm-shopping-button.component.html',
  styleUrls: ['./atm-shopping-button.component.scss'],
})
export class AtmShoppingButtonComponent {
  
  
  /**
   * Product for add to cart button
   * @type {Product}
   */
  @Input() product!: Product;

  /**
   * Flag for user authentication
   */
  isAuthenticated = false;

  /**
   * Store reference (cart.isLoading)
   */
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  /**
   * Store reference (user.isLogged)
   */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged)

  /**
   * Creates an instance of AtmShoppingButtonComponent.
   * @param {CartService} cartService
   * @param {AuthService} authService
   * @param {Store<{ user: UserState, cart: ShoppingCartState }>} store
   */
  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>,
  ) { 
    this.isLogged$.subscribe(value => {
      this.isAuthenticated = value;
    })
  }

  /**
   * Method to manage add to cart action
   * @param {Event} event
   * @return {*} 
   */
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
