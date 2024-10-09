import { Component, Input as RouterInput } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent {

  productId!: string;

  product!: Product;

  isRelatedProductsVisible: boolean = false;

  @RouterInput("productId")
  set setInputId(productId: string) {

    this.productId = productId;
    
    this.productsService.getProduct(this.productId)
      .then(product => this.product = product);
  }

  constructor(private productsService: ProductsService) {}

  toggleRelatedProducts(value: boolean) {
    this.isRelatedProductsVisible = value;
  }

}
