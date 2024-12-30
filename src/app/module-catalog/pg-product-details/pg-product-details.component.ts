import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input as RouterInput } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { MetaService } from 'app/services/meta.service';

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
   * Product loaded
   * @type {(Product | null)}
   */
  product: Product | null = null;

  /**
   * Boolean to track related products visibility
   */
  isRelatedProductsVisible = false;

  /**
   * Boolean to track loading state visibility
   */
  isLoadingProducts = true;

  /**
   * Boolean to track if product is already loaded
   */
  isProductLoaded = false;

  /**
  * Store reference (user.loading)
  */
  isUserLoading$: Observable<boolean> = this.store.select(state => state.user.loading);

  /**
   * Creates an instance of PgProductDetailsComponent.
   * @param {ProductsService} productsService
   * @param {AuthService} authService
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   * @param {MetaService} metaService
   */
  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router,
    private metaService: MetaService
  ) {
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
    this.isLoadingProducts = true;
    if (this.productId) {
      try {
        const product = await this.productsService.getProduct(this.productId)
        this.product = product;
        this.setMetaTags(product);
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          this.router.navigate(['404']);
        }
      } finally {
        this.isLoadingProducts = false;
      }
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
    this.metaService.updateMetaTagsAndTitle(
      `${product.description} - Proquifa`,
      [
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
    );
  }
}
