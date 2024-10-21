import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/services/products.service';

export type CardSizeClass =
  | 'product-card-size-detail'
  | 'product-card-size-home'
  | 'product-card-size-results';
@Component({
  selector: 'org-products-grid',
  templateUrl: './org-products-grid.component.html',
  styleUrl: './org-products-grid.component.scss',
})
export class OrgProductsGridComponent implements OnInit, OnChanges {
  @Input()
  products: ProductResponse | null = null;
  @Input()
  cardSizeClass: CardSizeClass = 'product-card-size-detail';
  productList: Product[] = [];

  ngOnInit(): void {
    this.productList = this.products ? this.products.results : [];
  }
  ngOnChanges(changes: SimpleChanges) {
    let products: SimpleChange = changes['products'];
    if (products) {
      this.productList = products.currentValue?.results;
    }
  }
}
