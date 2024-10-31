import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  @Output()
  onRelatedProductSelectedEmitter = new EventEmitter<string>();

  @Input()
  cartMode: boolean = true;

  isAddingToCar: boolean = false;
  quantity: number = 0;
  isRemoved: boolean = false;
  brandImage: string | null = null;
  presentationImage: string | null = null;

  constructor(
      private imageService: ImageService,
      private cartService: CartService,
      private store: Store<any>
  ) {
    this.store.subscribe((state) => {
      this.isAddingToCar = state.cart.isLoading;
    });
  }

  ngOnInit() {
    this.quantity = this.product.quantity;
    this.brandImage = this.imageService.getBrandImage(this.product);
    this.presentationImage = this.imageService.getPresentationImage(this.product);
  }

  loadRelated() {
    if(this.product.idProduct) {
      this.onRelatedProductSelectedEmitter.emit(this.product.idProduct);
    }
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
