import { Component, Input, OnInit } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageUtils } from 'app/utils/image.utils';

/**
 * Component to show purchase order item cart
 * @export
 * @class OrgPurchaseOrderItemCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-purchase-order-item-card',
  templateUrl: './org-purchase-order-item-card.component.html',
  styleUrls: ['./org-purchase-order-item-card.component.scss']
})
export class OrgPurchaseOrderItemCardComponent implements OnInit {

  /**
   * Cart purchase item
   * @type {QuoteProduct}
   */
  @Input() quoteItem!: QuoteProduct;

  /**
   * Brand image path
   * @type {(string | null)}
   */
  brandImage: string | null = null;

  /**
   * Product presentation item
   * @type {(string | null)}
   */
  presentationImage: string | null = null;

  /**
   * Creates an instance of OrgPurchaseOrderItemCardComponent.
   * @param {ImageUtils} imageUtils
   */
  constructor (private imageUtils: ImageUtils) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.brandImage = this.imageUtils.getBrandImage(this.quoteItem);
    this.presentationImage = this.imageUtils.getPresentationImage(this.quoteItem);
  }

}
