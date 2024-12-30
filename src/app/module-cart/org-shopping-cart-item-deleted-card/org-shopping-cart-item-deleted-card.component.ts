import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { CartService } from 'app/services/cart.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show cart product deleted
 * @export
 * @class OrgShoppingCartItemDeletedCardComponent
 */
@Component({
  selector: 'org-shopping-cart-item-deleted-card',
  templateUrl: './org-shopping-cart-item-deleted-card.component.html',
  styleUrls: ['./org-shopping-cart-item-deleted-card.component.scss'],
})
export class OrgShoppingCartItemDeletedCardComponent {


  /**
   * Product deleted
   * @type {QuoteProduct}
   */
  @Input() product!: QuoteProduct;

  /**
   * Add to cart again event emitter
   */
  @Output() addedToCarEmitter = new EventEmitter<QuoteProduct>();

  /**
   * Flag to identify if the cart is loading
   */
  isCartLoading = false;

  /**
  * Store reference (cart.isLoading)
  */
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  /**
   * Creates an instance of OrgShoppingCartItemDeletedCardComponent.
   * @param {CartService} cartService
   * @param {Store<{ cart: ShoppingCartState }>} store
   */
  constructor(
      private cartService: CartService,
      private store: Store<{ cart: ShoppingCartState }>
  ) { 
    this.isAddingToCar$.subscribe(value => {
      this.isCartLoading = value;
    })
  }

  /**
   * Method to add a product to cart
   */
  async addToCart() {
    if (!this.isCartLoading) {
      await this.cartService.reAddProduct(this.product);
      this.addedToCarEmitter.emit(this.product);
    }
  }


}
