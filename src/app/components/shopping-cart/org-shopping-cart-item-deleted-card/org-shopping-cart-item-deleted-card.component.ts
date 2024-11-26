import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { CartService } from 'app/services/cart.service';

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

  isAddingToCar = false;

  constructor(
      private cartService: CartService,
      private store: Store<any>
  ) {
    this.store.subscribe((state) => {
      this.isAddingToCar = state.cart.isLoading;
    });
  }


  async addToCart() {
    if (!this.isAddingToCar) {
      await this.cartService.reAddProduct(this.product);
      this.addedToCarEmitter.emit(this.product);
    }
  }

  
}
