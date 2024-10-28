import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

@Component({
  selector: 'org-quote-summary-card',
  templateUrl: './org-quote-summary-card.component.html',
  styleUrl: './org-quote-summary-card.component.scss'
})
export class OrgQuoteSummaryCardComponent {
  
  @Input()
  quoteProduct!: ShoppingCart;

  isShowingCustomerInfo: boolean = true;

  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
