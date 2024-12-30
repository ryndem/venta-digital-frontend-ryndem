import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { MetaService } from 'app/services/meta.service';
import { loadCart } from 'app/store/actions/cart.actions';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { ProductState } from 'app/store/reducers/product.reducer';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to show shopping cart details
 * @export
 * @class PgShoppingCartComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pg-shopping-cart',
  templateUrl: './pg-shopping-cart.component.html',
  styleUrls: ['./pg-shopping-cart.component.scss'],
})
export class PgShoppingCartComponent implements OnInit {

  /**
   * product id to load related product component
   * @type {(string | null)}
   */
  relatedProductsId: string | null = null;
  
  /**
   * Deleted product list to show the 'add again' option
   * @type {QuoteProduct[]}
   */
  deletedProducts: QuoteProduct[] = [];

  /**
  * Store reference (cart.shoppingCart)
  */
  shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);
  
  /**
  * Store reference (cart.isLoading)
  */
  isLoading$: Observable<boolean> = this.store.select(state=> state.cart.isLoading);

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  /**
   * Creates an instance of PgShoppingCartComponent.
   * @param {Store<{ cart: ShoppingCartState, product: ProductState }>} store
   * @param {Router} router
   * @param {MetaService} metaService
   */
  constructor(
    private store: Store<{ cart: ShoppingCartState, product: ProductState }>,
    private router: Router,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.store.dispatch(loadCart());
  }

  /**
   * Method to load related products
   * @param {string} productId
   */
  loadRelated(productId : string) {
    this.relatedProductsId = productId;
  }

  /**
   * Method to redirect to quote submition page 
   */
  submitQuote() {
    this.router.navigate(['cart/quote-submission']);
  }

  /**
   * Method to add an element to deleted product collection
   * @param {QuoteProduct} product
   */
  addToRemovedProducts( product: QuoteProduct) {
    if (!this.deletedProducts.find( p => p.idProduct === product.idProduct)) {
      this.deletedProducts.push(product)
    }
  }

  /**
   * Method to add a product again to the shopping cart
   * @param {QuoteProduct} product
   */
  reAddedToCar(product: QuoteProduct) {
    this.deletedProducts = this.deletedProducts.filter( p => p.idProduct != product.idProduct);
  }

  /**
   * Updates page meta tags
   */
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
