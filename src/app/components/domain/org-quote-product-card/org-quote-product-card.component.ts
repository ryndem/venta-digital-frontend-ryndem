import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { CartService } from 'app/services/cart.service';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-quote-product-card',
  templateUrl: './org-quote-product-card.component.html',
  styleUrl: './org-quote-product-card.component.scss',
})
export class OrgQuoteProductCardComponent implements OnInit {

  @Input()
  product!: QuoteProduct;
  
  @Input()
  cartMode: boolean = true;

  isAddingToCar: boolean = false;
  quantity: number = 0;
  isRemoved: boolean = false;

  constructor(private imageService: ImageService,
      private cartService: CartService,
      private store: Store<any>
  ) {
    this.store.subscribe((state) => {
      this.isAddingToCar = state.cart.isLoading;
    });
  }

  ngOnInit() {
    this.quantity = this.product.quantity;
  }

  loadAlternatives() {
  }

  plus() {
    this.quantity += 1;
    this.updateCart();
  }
  minus() {
    if(this.quantity > 0) {
      this.quantity -= 1;
      this.updateCart();
    }
  }

  async updateCart() {
    await this.cartService.updateQuantity(this.product.idQuotationItem, this.quantity)

    if (this.quantity <= 0)
      this.isRemoved = true;
  }

}
