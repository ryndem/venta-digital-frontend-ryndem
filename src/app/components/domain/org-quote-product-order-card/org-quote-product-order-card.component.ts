import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-quote-product-order-card',
  templateUrl: './org-quote-product-order-card.component.html',
  styleUrl: './org-quote-product-order-card.component.scss',
})
export class OrgQuoteProductOrderCardComponent implements OnInit {

  @Input()
  product!: QuoteProduct;
  
  @Input()
  quoteFolio: string = '';

  @Input()
  mode: string = 'add';

  @Output()
  onAddToOrderEmitter = new EventEmitter<string>();

  @Output()
  onRemoveToOrderEmitter = new EventEmitter<string>();

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
      this.onAddToOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

  removeFromOrder() {
    if(this.product.idQuotationItem) {
      this.onRemoveToOrderEmitter.emit(this.product.idQuotationItem);
    }
  }

}
