import { Component, Input } from '@angular/core';
import { Quote } from 'app/model/quote';
import { QuoteProduct } from 'app/model/quote-product';

@Component({
  selector: 'org-quote-card-detail',
  templateUrl: './org-quote-card-detail.component.html',
  styleUrl: './org-quote-card-detail.component.scss'
})
export class OrgQuoteCardDetailComponent {
  @Input()
  quoteProduct!: QuoteProduct;
}
