import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageUtils } from 'app/utils/image.utils';
import { removeProductFromCart, updateProductQuantity } from 'app/store/actions/cart.actions';
import { selectCartIsLoading } from 'app/store/selectors/cart.selectors';
import { ShoppingCartState } from 'app/store/states/cart.state';
import { Observable } from 'rxjs';

/**
 * Shopping prodouct card component
 * @export
 * @class OrgShoppingCartItemCardComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-shopping-cart-item-card',
  templateUrl: './org-shopping-cart-item-card.component.html',
  styleUrls: ['./org-shopping-cart-item-card.component.scss'],
})
export class OrgShoppingCartItemCardComponent implements OnInit, OnChanges {

  /**
   * Quotem item to show
   * @type {QuoteProduct}
   */
  @Input() product!: QuoteProduct;

  /**
   * Flag to allow product deletion
   */
  @Input() cartMode = true;

  /**
   * Property to show express freight input
   */
  @Input() showExpressFreightInput = false;

  /**
   * Property to disable express freight checkbox
   */
  @Input() disabledExpressFreightCheckbox = false;

  /**
   * Property to mark checkbox
   */
  @Input() checkboxMarked = false;

  /**
   * Property to emit related product selected
   */
  @Output() relatedProductSelectedEmitter = new EventEmitter<string>();

  /**
   * Property to emit express freight update
   */
  @Output() expressFreightChange = new EventEmitter<{ checked: boolean, product: QuoteProduct }>();

  /**
   * Property to emit product deletion
   */
  @Output() productDeletedEmitter = new EventEmitter<QuoteProduct>();

  /**
   * Quantity of the product in the shopping cart
   */
  quantity = 0;

  /**
   * Path of the product brand image
   * @type {(string | null)}
   */
  brandImage: string | null = null;

  /**
   * Path of the product presentation image
   * @type {(string | null)}
   */
  presentationImage: string | null = null;

  /**
   * Flag to show input checked
   */
  isChecked = false;

  /**
  * Store reference (cart.isLoading)
  */
  isAddingToCar$: Observable<boolean>;

  /**
   * Creates an instance of OrgShoppingCartItemCardComponent.
   * @param {ImageUtils} imageUtils
   * @param {Store<{ cart: ShoppingCartState }>} store
   */
  constructor(
      private imageUtils: ImageUtils,
      private store: Store<{ cart: ShoppingCartState }>
  ) { 
    this.isAddingToCar$ = this.store.select(selectCartIsLoading);
  }

  /**
   * Initializing method
   */
  ngOnInit() {
    this.quantity = this.product.quantity;
    this.brandImage = this.imageUtils.getBrandImage(this.product);
    this.presentationImage = this.imageUtils.getPresentationImage(this.product);
    this.isChecked = this.checkboxMarked;
  }

  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkboxMarked']) {
      this.isChecked = changes['checkboxMarked'].currentValue;
    }
  }


  /**
   * Method to emit load related products event
   */
  loadRelated() {
    if(this.product.idProduct) {
      this.relatedProductSelectedEmitter.emit(this.product.idProduct);
    }
  }

  /**
   * Method to listen cart quantity updates
   * @param {number} newQuantity
   */
  async onCartCounterChange(newQuantity: number) {
    this.quantity = newQuantity;
    await this.updateCart();
  }

  /**
   * Method to update product quantities
   */
  async updateCart() {
    this.store.dispatch(updateProductQuantity({quoteItemId: this.product.idQuotationItem, quantity: this.quantity}))
  }

  /**
   * Method to remove item from the card
   */
  async onRemoveItem() {
    this.store.dispatch(removeProductFromCart({quoteItemId: this.product.idQuotationItem}))
    this.productDeletedEmitter.emit(this.product);
  }

  /**
   * Method to manage express freight toggle
   * @param {QuoteProduct} product
   */
  onExpressFreightToggle(product: QuoteProduct) {
    this.isChecked = !this.isChecked;
    this.expressFreightChange.emit({ product, checked: this.isChecked });
  }
}
