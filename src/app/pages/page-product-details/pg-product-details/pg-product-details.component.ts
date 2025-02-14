import { Component, Input as RouterInput } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectProductDetails } from 'app/store/selectors/product.selectors';
import { loadProductById } from 'app/store/actions/product.actions';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';

/**
 * Page component to display product details
 * @export
 * @class PgProductDetailsComponent
 */
@Component({
  selector: 'pg-product-details',
  templateUrl: './pg-product-details.component.html',
  styleUrls: ['./pg-product-details.component.scss'],
})
export class PgProductDetailsComponent {

  /**
   *Product id to show
   * @type {string}
   */
  productId!: string;

  /**
   * Boolean to track related products visibility
   */
  isRelatedProductsVisible = false;

  /**
   * Boolean to track if product is already loaded
   */
  isProductLoaded = false;

  /**
  * Store reference (user.isLogged)
  */
  isAuthenticated$: Observable<boolean | null>;

  /**
  * Store reference (product.productDetails(id))
  */
  product$: Observable<Product | null>;

  /**
   * Creates an instance of PgProductDetailsComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store,
  ) {
    this.isAuthenticated$ = this.store.select(selectUserIsLogged);
    this.product$ = this.store.select(selectProductDetails(this.productId));

    this.product$.subscribe(value => {
      if(value) {
        this.setMetaTags(value);
      }
    })
  }


  /**
   * Product id setter
   */
  @RouterInput('productId')
  set setInputId(productId: string) {
    this.productId = productId;
    this.loadProduct();
  }

  /**
   * Load product
   */
  async loadProduct() {
    if (this.productId) {
      this.store.dispatch(loadProductById({productId: this.productId}));
      this.product$ = this.store.select(selectProductDetails(this.productId));
    }
  }

  /**
   * Toggle related products visibility
   * @param {boolean} value 
   */
  toggleRelatedProducts(value: boolean) {
    this.isRelatedProductsVisible = value;
  }

  /**
   * Updates page meta tags
   */
  setMetaTags(product: Product) {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: `${product.description} - Proquifa`, 
      tags: [
        {
          name: 'description',
          content: `Descubre más sobre ${product.description} de la marca ${product.brandImageName}. Compra ahora y recíbelo en el menor tiempo posible.`,
        },
        {
          name: 'keywords',
          content: `detalle producto, ${product.description}, ${product.brandImageName}, Proquifa, comprar, agregar al carrito`,
        },
        {
          property: 'og:title',
          content: `${product.description} - Proquifa`,
        },
        {
          property: 'og:description',
          content: `Compra ${product.description} de ${product.brandImageName}. Recíbelo rápidamente.`,
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/products/${product.idProduct}`,
        },
        {
          property: 'og:type',
          content: 'product',
        },
        {
          name: 'twitter:title',
          content: `${product.description} - Proquifa`,
        },
        {
          name: 'twitter:description',
          content: `Descubre ${product.description} de ${product.brandImageName}. Compra ahora en Proquifa.`,
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/products/${product.idProduct}`,
        },
      ]
    }));
  }
}
