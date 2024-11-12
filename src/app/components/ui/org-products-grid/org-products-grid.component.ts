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

export type GridSectionClass =
  | 'products-result'
  | 'alternative-complementary'
  | string;

@Component({
  selector: 'org-products-grid',
  templateUrl: './org-products-grid.component.html',
  styleUrls: ['./org-products-grid.component.scss'],
})
export class OrgProductsGridComponent implements OnInit, OnChanges {
  @Input()
  products: ProductResponse | null = null;
  @Input()
  productList: Product[] = [];
  @Input()
  gridSectionClass: GridSectionClass = '';

  ngOnInit(): void {
    this.productList = this.products ? this.products.results : [];
  }
  ngOnChanges(changes: SimpleChanges) {
    const products: SimpleChange = changes['products'];
    if (products) {
      this.productList = products.currentValue?.results;
    }
  }
}
