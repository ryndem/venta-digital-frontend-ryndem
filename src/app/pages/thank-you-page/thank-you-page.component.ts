import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.scss',
})
export class ThankYouPageComponent implements OnInit {
  isLoading: boolean = true;
  quote: ShoppingCart | null = null;
  shoppingCart : ShoppingCart | null = null;
  quoteId: string | null = null;
  showDisclaimer: boolean = false;
  user: User | null = null;

  constructor( 
      private cartService : CartService, 
      private quotesService : QuotesService, 
      private currentRoute: ActivatedRoute, 
      private store: Store<any>) {
    this.store.subscribe( event => {
      this.shoppingCart = event.cart.shoppingCart;
      this.user = event.user.user;
      this.isLoading = !event.cart.shoppingCart;
    });
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
      this.showDisclaimer = this.quote.quotationDetails.address.trim() == '';
    }
  }
}
