import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Component to show quote details info
 * @export
 * @class OrgQuoteDetailInfoComponent
 */
@Component({
  selector: 'org-quote-detail-info',
  templateUrl: './org-quote-detail-info.component.html',
  styleUrls: ['./org-quote-detail-info.component.scss']
})
export class OrgQuoteDetailInfoComponent {
  
  /**
   * Quote to show details info
   * @type {ShoppingCart}
   */
  @Input() quote!: ShoppingCart;
}
