import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Component to show quote totals
 * @export
 * @class OrgQuoteTotalsComponent
 */
@Component({
  selector: 'org-quote-totals',
  templateUrl: './org-quote-totals.component.html',
  styleUrls: ['./org-quote-totals.component.scss']
})
export class OrgQuoteTotalsComponent {

  /**
   * Quote totals to show
   * @type {ShoppingCart}
   */
  @Input() quote!: ShoppingCart;
  
}
