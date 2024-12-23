import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';
import { MetaService } from 'app/services/meta.service';
import { QuotesService } from 'app/services/quotes.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { UserState } from 'app/store/reducers/user.reducer';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-thank-you',
  templateUrl: './pg-thank-you.component.html',
  styleUrls: ['./pg-thank-you.component.scss'],
})
export class PgThankYouComponent implements OnInit {

  quote: ShoppingCart | null = null;
  quoteId: string | null = null;
  showDisclaimer = false;

  /**
  * Store references
  */
  user$: Observable<User | null> = this.store.select(state => state.user.user);

  constructor(
    private cartService : CartService,
    private quotesService : QuotesService,
    private currentRoute: ActivatedRoute,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.quoteId = params['quoteId'];
      this.loadQuote();
    });

    await this.cartService.load();
  }

  async loadQuote() {
    if( this.quoteId ) {
      this.quote = await this.quotesService.getById(this.quoteId);

      if (this.quote.quotationDetails.address.trim() == '') {
        this.showDisclaimer = true;
      }

      if (this.quote.listQuotationItem.filter(p => p.controlled).length > 0) {
        this.showDisclaimer = true;
      }

    }
  }

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Gracias por su Cotización - Proquifa',
      [
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
    );
  }

}
