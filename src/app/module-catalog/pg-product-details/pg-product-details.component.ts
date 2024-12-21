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

@Component({
  selector: 'pg-product-details',
  templateUrl: './pg-product-details.component.html',
  styleUrls: ['./pg-product-details.component.scss'],
})
export class PgProductDetailsComponent {
  productId!: string;

  product: Product | null = null;

  isRelatedProductsVisible = false;
  isLoadingProducts = true;
  isProductLoaded = false;

  /**
  * Store references
  */
  isUserLoading$: Observable<boolean> = this.store.select(state => state.user.loading);

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router,
    private metaService: MetaService
  ) {
  }


  @RouterInput('productId')
  set setInputId(productId: string) {
    this.productId = productId;
    this.loadProduct();
  }

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

  toggleRelatedProducts(value: boolean) {
    this.isRelatedProductsVisible = value;
  }

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
