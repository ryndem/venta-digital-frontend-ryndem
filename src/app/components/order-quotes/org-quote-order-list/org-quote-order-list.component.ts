import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'app/model/quote';

@Component({
  selector: 'org-quote-order-list',
  templateUrl: './org-quote-order-list.component.html',
  styleUrls: ['./org-quote-order-list.component.scss'],
})
export class OrgQuoteOrderListComponent {

  @Input()
  quotes!: Quote[];

  constructor(private router: Router) {}

  goToDetails(quote:any) {
    if (quote.idQuotation) {
      this.router.navigate(['quotes', quote.idQuotation]);

    } else if (quote.idPurchaseOrder) {
      this.router.navigate(['purchase-orders', quote.idPurchaseOrder]);
    } else if (quote.idOrder) {
      this.router.navigate(['orders', quote.idOrder]);
    }
  }
}
