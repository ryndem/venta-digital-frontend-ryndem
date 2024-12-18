import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'org-related-products',
  templateUrl: './org-related-products.component.html',
  styleUrls: ['./org-related-products.component.scss'],
})
export class OrgRelatedProductsComponent implements OnChanges {

  alternativeProducts: ProductResponse | null = null;
  complementaryProducts: ProductResponse | null = null;

  @Input()
  productId!: string;

  isShowingAlternativeProducts = true;
  isEmptyResult = false;
  skeletonList = Array(4).fill(0);

  constructor(private productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const productId: SimpleChange = changes['productId'];
    if (productId) {
      this.alternativeProducts = null;
      this.complementaryProducts = null;
      this.updateProducts(true);
    }
  }

  async updateProducts(isAlternative: boolean) {
    this.isShowingAlternativeProducts = isAlternative;

    if (this.isShowingAlternativeProducts) {
      this.loadAlternatives();
    } else if (!this.isShowingAlternativeProducts) {
      this.loadComplementary();
    }
  }

  async loadAlternatives() {
    if (!this.alternativeProducts) {
      this.isEmptyResult = false;
      const results = await this.productsService.listAlternativeProducts(
        this.productId,
      );
      this.alternativeProducts = results;
    }
    this.isEmptyResult = this.alternativeProducts.results.length == 0;
  }

  async loadComplementary() {
    if (!this.complementaryProducts) {
      this.isEmptyResult = false;
      const results = await this.productsService.listComplementaryProducts(
        this.productId,
      );
      this.complementaryProducts = results;
    }
    this.isEmptyResult = this.complementaryProducts.results.length == 0;
  }

}
