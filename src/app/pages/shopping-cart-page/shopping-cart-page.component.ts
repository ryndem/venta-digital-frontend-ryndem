import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit {
  
  isLoading = true;
  shoppingCart : ShoppingCart | null = null;
  relatedProductsId: string | null = null;
  categories: Category[] = [];
  deletedProducts: QuoteProduct[] = [];

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

  addToRemovedProducts( product: QuoteProduct) {
    if (!this.deletedProducts.find( p => p.idProduct === product.idProduct)) {
      this.deletedProducts.push(product)
    }
  }

  reAddedToCar(product: QuoteProduct) {
    this.deletedProducts = this.deletedProducts.filter( p => p.idProduct != product.idProduct);
  }

}
