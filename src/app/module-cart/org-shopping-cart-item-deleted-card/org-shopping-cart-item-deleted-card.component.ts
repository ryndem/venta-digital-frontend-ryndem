import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { CartService } from 'app/services/cart.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-shopping-cart-item-deleted-card',
  templateUrl: './org-shopping-cart-item-deleted-card.component.html',
  styleUrls: ['./org-shopping-cart-item-deleted-card.component.scss'],
})
export class OrgShoppingCartItemDeletedCardComponent {

  @Input()
  product!: QuoteProduct;

  @Output()
  addedToCarEmitter = new EventEmitter<QuoteProduct>();

  isCartLoading = false;

  /**
  * Store references
  */
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  
  constructor(
      private cartService: CartService,
      private store: Store<{ cart: ShoppingCartState }>
  ) { 
    this.isAddingToCar$.subscribe(value => {
      this.isCartLoading = value;
    })
  }


  async addToCart() {
    if (!this.isCartLoading) {
      await this.cartService.reAddProduct(this.product);
      this.addedToCarEmitter.emit(this.product);
    }
  }


}
