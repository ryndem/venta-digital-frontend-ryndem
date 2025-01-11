import { Component, Input as RouterInput } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { loadQuoteById } from 'app/store/actions/order.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectQuoteDetails } from 'app/store/selectors/order.selectors';
import { ViewState } from 'app/store/states/view.state';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display quote details
 * @export
 * @class PgQuoteDetailsComponent
 */
@Component({
  selector: 'pg-quote-details',
  templateUrl: './pg-quote-details.component.html',
  styleUrls: ['./pg-quote-details.component.scss'],
})
export class PgQuoteDetailsComponent {
  
  /**
   * Quote id to show details
   */
  quoteId!: string;

  /**
   * Store reference (order.quotes(id))
   */
  quote$: Observable<ShoppingCart | null>;

  /**
   * Set quote id from url
   */
  @RouterInput('quoteId')
  set setInputId(quoteId: string) {
    this.quoteId = quoteId;
    this.loadQuote();
  }


  /**
   * Creates an instance of PgQuoteDetailsComponent.
   * @param {Store<ViewState>} store
   */
  constructor(
    private store: Store<ViewState>,
  ) {
    this.quote$ = this.store.select(selectQuoteDetails(this.quoteId));
    this.setMetaTags();
  }


  /**
   * Method to load quote to display
   */
  async loadQuote() {
    this.store.dispatch(loadQuoteById({quoteId: this.quoteId}));
    this.quote$ = this.store.select(selectQuoteDetails(this.quoteId));
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: `Detalles de Cotización #${this.quoteId} - Proquifa`, 
      tags: [
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
    }));

  }

}
