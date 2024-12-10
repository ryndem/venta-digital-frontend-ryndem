import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-purchase-order-item-form-card',
  templateUrl: './org-purchase-order-item-form-card.component.html',
  styleUrls: ['./org-purchase-order-item-form-card.component.scss'],
})
export class OrgPurchaseOrderItemFormCardComponent implements OnInit {

  @Input()
  product!: QuoteProduct;

  @Input()
  quoteFolio = '';

  @Input()
  mode = 'add';

  @Input()
  quantity = 0;

  @Input()
  expressFleight = false;

  @Output()
  addedToOrderEmitter = new EventEmitter<string>();

  @Output()
  removedFromOrderEmitter = new EventEmitter<string>();

  @Output()
  updateQuantityEmitter = new EventEmitter<{
    quoteItemId: string,
    quantity: number
  }>();

  @Output()
  updateExpressFreightEmitter = new EventEmitter<{
    quoteItemId: string,
    expressFreight: boolean
  }>();

  brandImage: string | null = null;
  presentationImage: string | null = null;

  constructor(
      private imageService: ImageService
  ) {
  }

  ngOnInit() {
    this.brandImage = this.imageService.getBrandImage(this.product);
    this.presentationImage = this.imageService.getPresentationImage(this.product);
  }

  addToOrder() {
    if(this.product.idQuotationItem) {
      this.addedToOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

  removeFromOrder() {
    if(this.product.idQuotationItem) {
      this.removedFromOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

  updateProductUnits(quantity: number) {
    this.updateQuantityEmitter.emit({ quoteItemId: this.product.idQuotationItem, quantity: quantity});
  }

  setExpressFreight( value: boolean ) {
    this.expressFleight = value;
    this.updateExpressFreightEmitter.emit({ quoteItemId: this.product.idQuotationItem, expressFreight: value});
  }

}
