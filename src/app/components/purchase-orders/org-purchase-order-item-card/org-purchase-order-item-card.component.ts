import { Component, Input, OnInit } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-purchase-order-item-card',
  templateUrl: './org-purchase-order-item-card.component.html',
  styleUrls: ['./org-purchase-order-item-card.component.scss']
})
export class OrgPurchaseOrderItemCardComponent implements OnInit {

  @Input()
  quoteItem!: QuoteProduct;

  brandImage: string | null = null;
  presentationImage: string | null = null;

  constructor (private imageService: ImageService) {}

  ngOnInit(): void {
    this.brandImage = this.imageService.getBrandImage(this.quoteItem);
    this.presentationImage = this.imageService.getPresentationImage(this.quoteItem);
  }

}
