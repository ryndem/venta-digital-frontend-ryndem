import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'quote-cart-page',
  templateUrl: './quote-cart-page.component.html',
  styleUrl: './quote-cart-page.component.scss',
})
export class QuoteCartPageComponent implements OnInit {
  
  isLoading: boolean = true;
  shoppingCart : ShoppingCart | null = null;
  relatedProductsId: string | null = null;
  categories: Category[] = [];

  constructor( 
      private cartService : CartService, 
      private store: Store<any>, 
      private router: Router) {

    this.store.subscribe( event => {
      this.shoppingCart = event.cart.shoppingCart;
      this.isLoading = event.cart.isLoading;
      this.categories = event.product.categories;
    });

  }

  async ngOnInit(): Promise<void> {
    await this.cartService.load();
  }

  loadRelated(productId : string) {
    this.relatedProductsId = productId;
  }
  submitQuote() {
    this.router.navigate(['quote-submission']);
  }

}
