import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { addProductToCart } from 'app/store/actions/cart.actions';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';
import { selectCartIsLoading } from 'app/store/selectors/cart.selectors';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
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
  isAddingToCar$: Observable<boolean>;

  /**
   * Store reference (user.isLogged)
   */
  isLogged$: Observable<boolean | null>;

  /**
   * Creates an instance of AtmShoppingButtonComponent.
   * @param {AuthService} authService
   * @param {Store} store
   */
  constructor(
    private store: Store,
  ) { 
    this.isAddingToCar$ = this.store.select(selectCartIsLoading);
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.isLogged$.subscribe(value => {
      this.isAuthenticated = value == true;
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

    if (!this.isAuthenticated) {
      this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
      return;
    }

    this.store.dispatch(addProductToCart({product: this.product, quantity: 1}));
  }
}
