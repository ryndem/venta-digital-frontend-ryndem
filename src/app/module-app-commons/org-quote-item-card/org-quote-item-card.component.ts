import { Component, Input, OnInit } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

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
   * @param {ImageService} imageService
   */
  constructor (private imageService: ImageService) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.brandImage = this.imageService.getBrandImage(this.quoteItem);
    this.presentationImage = this.imageService.getPresentationImage(this.quoteItem);
  }

}
