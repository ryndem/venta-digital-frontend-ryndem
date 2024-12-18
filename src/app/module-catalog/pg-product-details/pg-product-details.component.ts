import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input as RouterInput } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

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

  isUserLoading$: Observable<boolean> = this.store.select(state => state.user.loading);

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router,
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
}
