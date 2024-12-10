import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteItem } from 'app/model/quote';

@Component({
  selector: 'org-quote-order-list',
  templateUrl: './org-quote-order-list.component.html',
  styleUrls: ['./org-quote-order-list.component.scss'],
})
export class OrgQuoteOrderListComponent {

  @Input()
  quotes!: QuoteItem[];
  @Input()
  currentTab!: string;

  constructor(private router: Router) {}

  goToDetails(id: string) {
    if (this.currentTab === 'quotes') {
      this.router.navigate(['quotes', id]);
    } else if (this.currentTab === 'in-progress') {
      this.router.navigate(['purchase-orders', id]);
    } else if (this.currentTab === 'confirmed') {
      this.router.navigate(['orders', id]);
    }
  }
}
