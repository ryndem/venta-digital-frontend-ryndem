import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'org-related-products',
  templateUrl: './org-related-products.component.html',
  styleUrl: './org-related-products.component.scss'
})
export class OrgRelatedProductsComponent {

  @Input("productId")
  set setProductId(productId: string) {
    this.productId = productId;
    this.productsService.listAlternativeProducts(this.productId)
      .then(products => this.relatedProducts = products);
  }

  @Input()
  relatedProducts: Product[] = [];

  productId!: string;

  isShowingAlternativeProducts: boolean = true;

  constructor(private productsService: ProductsService) {}

  updateProducts(isAlternative: boolean) {
    
    this.isShowingAlternativeProducts = isAlternative;

    if (this.isShowingAlternativeProducts) {
      this.productsService.listAlternativeProducts(this.productId)
      .then(products => this.relatedProducts = products);
    } else {
      this.productsService.listComplementaryProducts(this.productId)
      .then(products => this.relatedProducts = products);
    }

  }

}
