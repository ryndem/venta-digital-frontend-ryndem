import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-quote-product-order-card',
  templateUrl: './org-quote-product-order-card.component.html',
  styleUrls: ['./org-quote-product-order-card.component.scss'],
})
export class OrgQuoteProductOrderCardComponent implements OnInit {

  @Input()
  product!: QuoteProduct;
  
  @Input()
  quoteFolio = '';

  @Input()
  mode = 'add';

  @Output()
  addedToOrderEmitter = new EventEmitter<string>();

  @Output()
  removedFromOrderEmitter = new EventEmitter<string>();

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

}
