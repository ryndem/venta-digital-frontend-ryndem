import { Component, Input as RouterInput } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'quote-details-page',
  templateUrl: './quote-details-page.component.html',
  styleUrls: ['./quote-details-page.component.scss'],
})
export class QuoteDetailsPageComponent {

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
