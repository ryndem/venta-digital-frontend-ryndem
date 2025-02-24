import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { User } from 'app/model/user';
import { loadCart } from 'app/store/actions/cart.actions';
import { loadQuoteById } from 'app/store/actions/order.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectQuoteDetails } from 'app/store/selectors/order.selectors';
import { selectCurrentUser } from 'app/store/selectors/user.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display quote creation confirmation
 * @export
 * @class PgThankYouComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pg-thank-you',
  templateUrl: './pg-thank-you.component.html',
  styleUrls: ['./pg-thank-you.component.scss'],
})
export class PgThankYouComponent implements OnInit {

  /**
   * Quote id of the created quote
   * @type {(string | null)}
   */
  quoteId: string | null = null;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null>;

  /**
  * Store reference (order.quotes[id])
  */
  quote$: Observable<ShoppingCart | null>;

  /**
   * Variable to storage if the disclaimer message should be shown
  */
  disclaimerVisible = false;


  /**
   * Creates an instance of PgThankYouComponent.
   * @param {ActivatedRoute} currentRoute
   * @param {Store} store
   */
  constructor(
    private currentRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.user$ = this.store.select(selectCurrentUser);
    this.quote$ = this.store.select(selectQuoteDetails(this.quoteId || ''));
    this.setMetaTags();
  }


  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.quoteId = params['quoteId'];
      if (this.quoteId) {
        this.quote$ = this.store.select(selectQuoteDetails(this.quoteId));
        this.quote$.subscribe((quote) => {
          this.disclaimerVisible = this.getDisclaimerVisibility(quote);
        });
      }
      this.loadQuote();
    });

    this.store.dispatch(loadCart());
  }


  /**
   * Method to load created quote information
   */
  async loadQuote() {
    if( this.quoteId ) {
      this.store.dispatch(loadQuoteById({quoteId: this.quoteId}));
    }
  }

  /**
   * Method to calculate if the disclaimer should be shown
   */
  getDisclaimerVisibility(quote: ShoppingCart | null) {
    if (quote?.quotationDetails.address.trim() === '') {
      return true;
    }

    if ((quote?.listQuotationItem.filter(p => p.controlled).length || 0) > 0) {
      return true;
    }
    return false;
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Gracias por su Cotización - Proquifa',
      tags: [
        {
          name: 'description',
          content: 'Revisa el resumen de tu cotización enviada. Consulta el listado de productos cotizados, información de envío, y detalles de tu cotización en Proquifa.',
        },
        {
          name: 'keywords',
          content: 'resumen de cotización, productos cotizados, folio de cotización, información de cliente, envío, moneda, Proquifa',
        },
        {
          property: 'og:title',
          content: 'Gracias por su Cotización - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Consulta el resumen completo de tu cotización con productos cotizados, detalles de envío y folio generado en Proquifa.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/cart/thank-you`,
        },
        {
          name: 'twitter:title',
          content: 'Gracias por su Cotización - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Revisa el resumen de tu cotización enviada, incluyendo productos, folio generado, fecha y detalles de envío en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/cart/thank-you`,
        },
      ]
    }));

  }

}
