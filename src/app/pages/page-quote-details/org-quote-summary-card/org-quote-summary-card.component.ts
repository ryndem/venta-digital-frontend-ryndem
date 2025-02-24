import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Component to show quote summary card
 * @export
 * @class OrgQuoteSummaryCardComponent
 */
@Component({
  selector: 'org-quote-summary-card',
  templateUrl: './org-quote-summary-card.component.html',
  styleUrls: ['./org-quote-summary-card.component.scss']
})
export class OrgQuoteSummaryCardComponent {
  
  /**
   * Quote item to display summary card
   * @type {ShoppingCart | null}
   */
  @Input() quoteProduct!: ShoppingCart | null;

  /**
   * Boolean to show/hide customer info
   */
  isShowingCustomerInfo = true;


  /**
   * Method to toggle customer info
   */
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
