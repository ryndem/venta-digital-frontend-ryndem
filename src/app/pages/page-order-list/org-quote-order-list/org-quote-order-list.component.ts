import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteItem } from 'app/model/quote';

/**
 * Component to show order/quote/purchase-order list
 * @export
 * @class OrgQuoteOrderListComponent
 */
@Component({
  selector: 'org-quote-order-list',
  templateUrl: './org-quote-order-list.component.html',
  styleUrls: ['./org-quote-order-list.component.scss'],
})
export class OrgQuoteOrderListComponent {

  /**
   * Order list to show
   * @type {QuoteItem[]}
   */
  @Input() quotes!: QuoteItem[] | null;

  /**
   * Current list tab
   * @type {string}
   */
  @Input() currentTab!: string;

  /**
   * Creates an instance of OrgQuoteOrderListComponent.
   * @param {Router} router
   */
  constructor(private router: Router) {}

  /**
   * Method to navigate to order details
   * @param {string} id
   */
  goToDetails(id: string) {
    if (this.currentTab === 'quotes') {
      this.router.navigate(['orders/quotes', id]);
    } else if (this.currentTab === 'in-progress') {
      this.router.navigate(['orders/in-progress', id]);
    } else if (this.currentTab === 'confirmed') {
      this.router.navigate(['orders', id]);
    }
  }
}
