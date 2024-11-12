import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input as RouterInput } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})
export class ProductDetailsPageComponent {
  productId!: string;

  product!: Product;

  isRelatedProductsVisible = false;
  isLogged = false;

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private store: Store<any>,
    private router: Router,
  ) {
    this.store.subscribe((state) => {
      if (this.isLogged != state.user.isLogged) {
        this.isLogged = state.user.isLogged;
        this.loadProduct();
      }
    });
  }

  @RouterInput('productId')
  set setInputId(productId: string) {
    this.productId = productId;
    this.loadProduct();
  }

  async loadProduct() {
    if (this.productId) {
      try {
        const product = await this.productsService.getProduct(this.productId)
        this.product = product;
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          this.router.navigate(['404']);
        }
      }
    }
  }

  toggleRelatedProducts(value: boolean) {
    this.isRelatedProductsVisible = value;
  }
}
