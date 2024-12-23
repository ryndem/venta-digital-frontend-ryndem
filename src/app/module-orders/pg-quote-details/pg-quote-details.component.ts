import { Component, Input as RouterInput } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';
import { MetaService } from 'app/services/meta.service';
import { QuotesService } from 'app/services/quotes.service';
import { environment } from 'environments/environment';

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

  constructor(
    private metaService: MetaService,
    private quotesService: QuotesService,
  ) {
    this.setMetaTags();
  }

  async loadQuote() {
		this.quote = await this.quotesService.getById(this.quoteId);
  }

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      `Detalles de Cotización #${this.quoteId} - Proquifa`,
      [
        {
          name: 'description',
          content: `Consulta los detalles de la cotización #${this.quoteId}. Revisa el listado de productos, montos totales y detalles del cliente en Proquifa.`,
        },
        {
          name: 'keywords',
          content: `detalles de cotización, cotización #${this.quoteId}, productos cotizados, montos totales, cliente, Proquifa`,
        },
        {
          property: 'og:title',
          content: `Detalles de Cotización #${this.quoteId} - Proquifa`,
        },
        {
          property: 'og:description',
          content: `Revisa la cotización #${this.quoteId}. Consulta productos cotizados, montos y detalles del cliente.`,
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/orders/quotes/${this.quoteId}`,
        },
        {
          name: 'twitter:title',
          content: `Detalles de Cotización #${this.quoteId} - Proquifa`,
        },
        {
          name: 'twitter:description',
          content: `Consulta los detalles de la cotización #${this.quoteId}. Productos, montos y detalles del cliente.`,
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/orders/quotes/${this.quoteId}`,
        },
      ]
    );
  }

}
