import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';
import { MetaService } from 'app/services/meta.service';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { ProductState } from 'app/store/reducers/product.reducer';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-shopping-cart',
  templateUrl: './pg-shopping-cart.component.html',
  styleUrls: ['./pg-shopping-cart.component.scss'],
})
export class PgShoppingCartComponent implements OnInit {

  relatedProductsId: string | null = null;
  deletedProducts: QuoteProduct[] = [];

  /**
  * Store references
  */
  shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);
  isLoading$: Observable<boolean> = this.store.select(state=> state.cart.isLoading);
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  constructor(
    private cartService : CartService,
    private store: Store<{ cart: ShoppingCartState, product: ProductState }>,
    private router: Router,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

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

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Carrito de Compras - Proquifa',
      [
        {
          name: 'description',
          content: 'Revisa los productos que has agregado al carrito. Consulta el subtotal y continúa para cotizar tus partidas de manera fácil y rápida.',
        },
        {
          name: 'keywords',
          content: 'carrito de compras, productos seleccionados, Proquifa, subtotal, cotizar partidas',
        },
        {
          property: 'og:title',
          content: 'Carrito de Compras - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Gestiona tu carrito de compras con los productos seleccionados y cotiza tus partidas de manera sencilla en Proquifa.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/cart/shopping-cart`,
        },
        {
          name: 'twitter:title',
          content: 'Carrito de Compras - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Revisa tu carrito de compras con productos seleccionados y procede a cotizar tus partidas en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/cart/shopping-cart`,
        },
      ]
    );
  }

}
