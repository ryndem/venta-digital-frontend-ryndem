import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';
import { QuotesService } from 'app/services/quotes.service';
import { ShoppingCartState } from 'app/store/cart/cart.reducer';
import { UserState } from 'app/store/users/user.reducer';
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
  user$: Observable<User | null> = this.store.select(state => state.user.user);

  constructor(
    private cartService : CartService,
    private quotesService : QuotesService,
    private currentRoute: ActivatedRoute,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>
  ) { }

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
}
