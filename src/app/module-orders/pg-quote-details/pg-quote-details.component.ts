import { Component, Input as RouterInput } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'pg-quote-details',
  templateUrl: './pg-quote-details.component.html',
  styleUrls: ['./pg-quote-details.component.scss'],
})
export class PgQuoteDetailsComponent {

  quoteId!: string;
  quote: ShoppingCart | null = null;

  @RouterInput('quoteId')
  set setInputId(quoteId: string) {
    this.quoteId = quoteId;
    this.loadQuote();
  }

  constructor(private quotesService: QuotesService) {}

  async loadQuote() {
    this.quote = await this.quotesService.getById(this.quoteId);
  }

}
