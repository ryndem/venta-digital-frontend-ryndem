import { Component, Input, OnInit } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageUtils } from 'app/utils/image.utils';

/**
 * Component to show quote item card
 * @export
 * @class OrgQuoteItemCardComponent
 */
@Component({
  selector: 'org-quote-item-card',
  templateUrl: './org-quote-item-card.component.html',
  styleUrls: ['./org-quote-item-card.component.scss']
})
export class OrgQuoteItemCardComponent implements OnInit {

  /**
   * Quote item to show
   * @type {QuoteProduct}
   */
  @Input() quoteItem!: QuoteProduct;

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
   * Creates an instance of OrgQuoteItemCardComponent.
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
