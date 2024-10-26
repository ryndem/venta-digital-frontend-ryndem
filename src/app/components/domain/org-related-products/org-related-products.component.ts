import { Component, Input } from '@angular/core';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'org-related-products',
  templateUrl: './org-related-products.component.html',
  styleUrl: './org-related-products.component.scss',
})
export class OrgRelatedProductsComponent {
  @Input('productId')
  set setProductId(productId: string) {
    this.productId = productId;
    this.updateProducts(true);
  }

  alternativeProducts: ProductResponse | null = null;
  complementaryProducts: ProductResponse | null = null;

  productId!: string;

  isShowingAlternativeProducts: boolean = true;
  isEmptyResult: boolean = false;

  constructor(private productsService: ProductsService) {}

  async updateProducts(isAlternative: boolean) {
    this.isShowingAlternativeProducts = isAlternative;

    if (this.isShowingAlternativeProducts) {
      if (!this.alternativeProducts) {
        let results = await this.productsService.listAlternativeProducts(
          this.productId,
        );
        this.alternativeProducts = results;
      }
      this.isEmptyResult = this.alternativeProducts.results.length == 0;
    } else if (!this.isShowingAlternativeProducts) {
      if (!this.complementaryProducts) {
        let results = await this.productsService.listComplementaryProducts(
          this.productId,
        );
        this.complementaryProducts = results;
      }
      this.isEmptyResult = this.complementaryProducts.results.length == 0;
    }
  }
}
