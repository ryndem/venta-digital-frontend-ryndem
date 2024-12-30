import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';

/**
 * Component to show product related products
 * @export
 * @class OrgRelatedProductsComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-related-products',
  templateUrl: './org-related-products.component.html',
  styleUrls: ['./org-related-products.component.scss'],
})
export class OrgRelatedProductsComponent implements OnChanges {

  /**
   * Product id to show related products
   * @type {string}
   */
  @Input() productId!: string;
  
  /**
   * List of alternative products
   * @type {(ProductResponse | null)}
   */
  alternativeProducts: ProductResponse | null = null;

  /**
   * List of complementary products
   * @type {(ProductResponse | null)}
   */
  complementaryProducts: ProductResponse | null = null;

  /**
   * Flag to show alternative products
   */
  isShowingAlternativeProducts = true;

  /**
   * Flag to show empty state
   */
  isEmptyResult = false;

  /**
   * Skeleton list to show on loading state
   */
  skeletonList = Array(4).fill(0);

  /**
   * Creates an instance of OrgRelatedProductsComponent.
   * @param {ProductsService} productsService
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const productId: SimpleChange = changes['productId'];
    if (productId) {
      this.alternativeProducts = null;
      this.complementaryProducts = null;
      this.updateProducts(true);
    }
  }

  /**
   * Method to load related products
   * @param {boolean} isAlternative
   */
  async updateProducts(isAlternative: boolean) {
    this.isShowingAlternativeProducts = isAlternative;

    if (this.isShowingAlternativeProducts) {
      this.loadAlternatives();
    } else if (!this.isShowingAlternativeProducts) {
      this.loadComplementary();
    }
  }

  /**
   * Method to load alternative products
   */
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

  /**
   * Method to load complementary products
   */
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
