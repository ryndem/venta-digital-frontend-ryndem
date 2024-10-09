import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/services/products.service';

@Component({
  selector: 'org-products-grid',
  templateUrl: './org-products-grid.component.html',
  styleUrl: './org-products-grid.component.scss'
})
export class OrgProductsGridComponent implements OnInit {

  @Input()
  products: ProductResponse | null = null;

  productList: Product[] = [];

  ngOnInit(): void {
    this.productList = this.products? this.products.results : [];
  }

}
