import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { CartService } from 'app/services/cart.service';
import { ImageService } from 'app/services/image.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-shopping-cart-item-card',
  templateUrl: './org-shopping-cart-item-card.component.html',
  styleUrls: ['./org-shopping-cart-item-card.component.scss'],
})
export class OrgShoppingCartItemCardComponent implements OnInit, OnChanges {

  @Input()
  product!: QuoteProduct;

  @Input()
  cartMode = true;

  @Input()
  showExpressFreightInput = false;

  @Input()
  disabledExpressFreightCheckbox = false;

  @Input()
  checkboxMarked = false;

  @Output()
  relatedProductSelectedEmitter = new EventEmitter<string>();

  @Output()
  expressFreightChange = new EventEmitter<{ checked: boolean, product: QuoteProduct }>();

  @Output()
  productDeletedEmitter = new EventEmitter<QuoteProduct>();

  quantity = 0;
  brandImage: string | null = null;
  presentationImage: string | null = null;
  isChecked = false;

  /**
  * Store references
  */
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  constructor(
      private imageService: ImageService,
      private cartService: CartService,
      private store: Store<{ cart: ShoppingCartState }>
  ) { }

  ngOnInit() {
    this.quantity = this.product.quantity;
    this.brandImage = this.imageService.getBrandImage(this.product);
    this.presentationImage = this.imageService.getPresentationImage(this.product);
    this.isChecked = this.checkboxMarked;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkboxMarked']) {
      this.isChecked = changes['checkboxMarked'].currentValue;
    }
  }


  loadRelated() {
    if(this.product.idProduct) {
      this.relatedProductSelectedEmitter.emit(this.product.idProduct);
    }
  }

  async onCartCounterChange(newQuantity: number) {
    this.quantity = newQuantity;
    await this.updateCart();
  }

  async updateCart() {
    await this.cartService.updateQuantity(this.product.idQuotationItem, this.quantity)
  }

  async onRemoveItem() {
    await this.cartService.updateQuantity(this.product.idQuotationItem, 0);
    this.productDeletedEmitter.emit(this.product);
  }

  onExpressFreightToggle(product: QuoteProduct) {
    this.isChecked = !this.isChecked;
    this.expressFreightChange.emit({ product, checked: this.isChecked });
  }
}
