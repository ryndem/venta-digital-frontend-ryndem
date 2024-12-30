import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

/**
 * Product card to show/handle items on purchase order creation
 * @export
 * @class OrgPurchaseOrderItemFormCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-purchase-order-item-form-card',
  templateUrl: './org-purchase-order-item-form-card.component.html',
  styleUrls: ['./org-purchase-order-item-form-card.component.scss'],
})
export class OrgPurchaseOrderItemFormCardComponent implements OnInit {

  /**
   * Product to show in the card
   * @type {QuoteProduct}
   */
  @Input() product!: QuoteProduct;

  /**
   * Folio of the origin quote 
   */
  @Input() quoteFolio = '';

  /**
   * Product card mode 
   */
  @Input() mode = 'add';

  /**
   * Product quantity
   */
  @Input() quantity = 0;

  /**
   * Boolean to track express fleight
   */
  @Input() expressFleight = false;

  /**
   * Emitter to add product to order
   */
  @Output() addedToOrderEmitter = new EventEmitter<string>();

  /**
   * Emitter to remove product from order
   */
  @Output() removedFromOrderEmitter = new EventEmitter<string>();

  /**
   * Emitter to update product quantity
   */
  @Output() updateQuantityEmitter = new EventEmitter<{
    quoteItemId: string,
    quantity: number
  }>();

  /**
   * Emitter to update express freight
   */
  @Output() updateExpressFreightEmitter = new EventEmitter<{
    quoteItemId: string,
    expressFreight: boolean
  }>();

  /**
   * Brand image path
   * @type {(string | null)}
   */
  brandImage: string | null = null;

  /**
   * Presentation image path
   * @type {(string | null)}
   */
  presentationImage: string | null = null;


  /**
   * Creates an instance of OrgPurchaseOrderItemFormCardComponent.
   * @param {ImageService} imageService
   */
  constructor(
      private imageService: ImageService
  ) { }

  /**
   * Initializing method
   */
  ngOnInit() {
    this.brandImage = this.imageService.getBrandImage(this.product);
    this.presentationImage = this.imageService.getPresentationImage(this.product);
  }

  /**
   * Method to add a product to order
   */
  addToOrder() {
    if(this.product.idQuotationItem) {
      this.addedToOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

  /**
   * Method to remove item from order
   */
  removeFromOrder() {
    if(this.product.idQuotationItem) {
      this.removedFromOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

  /**
   * Method to update product units
   * @param {number} quantity
   */
  updateProductUnits(quantity: number) {
    this.updateQuantityEmitter.emit({ quoteItemId: this.product.idQuotationItem, quantity: quantity});
  }

  /**
   * Method to update express freight 
   * @param {boolean} value
   */
  setExpressFreight( value: boolean ) {
    this.expressFleight = value;
    this.updateExpressFreightEmitter.emit({ quoteItemId: this.product.idQuotationItem, expressFreight: value});
  }

}
