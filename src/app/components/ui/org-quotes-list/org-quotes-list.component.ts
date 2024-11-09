import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'app/model/quote';

@Component({
  selector: 'org-quotes-list',
  templateUrl: './org-quotes-list.component.html',
  styleUrl: './org-quotes-list.component.scss',
})
export class OrgQuotesListComponent {

  @Input()
  quotes!: Quote[];

  constructor(private router: Router) {}

  goToDetails(quote:any) {

    if (quote.idQuotation) {
      this.router.navigate(['quotes', quote.idQuotation]);

    } else if (quote.idPurchaseOrder) {
      this.router.navigate(['purchase-orders', quote.idPurchaseOrder]);

    }
  }
}
