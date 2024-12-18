import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';
import { ShoppingCartState } from 'app/store/cart/cart.reducer';
import { ProductState } from 'app/store/products/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-shopping-cart',
  templateUrl: './pg-shopping-cart.component.html',
  styleUrls: ['./pg-shopping-cart.component.scss'],
})
export class PgShoppingCartComponent implements OnInit {

  relatedProductsId: string | null = null;
  deletedProducts: QuoteProduct[] = [];

  shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);
  isLoading$: Observable<boolean> = this.store.select(state=> state.cart.isLoading);
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  constructor(
    private cartService : CartService,
    private store: Store<{ cart: ShoppingCartState, product: ProductState }>,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.cartService.load();
  }

  loadRelated(productId : string) {
    this.relatedProductsId = productId;
  }
  submitQuote() {
    this.router.navigate(['cart/quote-submission']);
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
