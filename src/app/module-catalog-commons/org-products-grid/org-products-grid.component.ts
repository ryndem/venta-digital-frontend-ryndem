import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';

/**
 * Component to show product page on product catalog
 * @export
 * @class OrgProductsGridComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-products-grid',
  templateUrl: './org-products-grid.component.html',
  styleUrls: ['./org-products-grid.component.scss'],
})
export class OrgProductsGridComponent implements OnInit, OnChanges {
  /**
   * Product page loaded
   * @type {(ProductResponse | null)}
   */
  @Input() products: ProductResponse | null = null;

  /**
   * Product list to show
   * @type {Product[]}
   */
  @Input() productList: Product[] = [];

  /**
   * Grid css class to add to the component
   * @type {('products-result' | 'alternative-complementary' | string)}
   */
  @Input() gridSectionClass: 'products-result' | 'alternative-complementary' | string = '';

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.productList = this.products ? this.products.results : [];
  }
  
  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    const products: SimpleChange = changes['products'];
    if (products) {
      this.productList = products.currentValue?.results;
    }
  }
}
