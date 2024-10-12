import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import {
  ProductResponse,
  ProductsService,
} from 'app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  productResponse: ProductResponse | null = null;
  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.loadOutstandingProducts();
  }

  async loadOutstandingProducts() {
    let p1 = await this.productsService.getProduct(
      '2c2541b6-9294-4aad-bcc3-4540c1d5825a',
    );
    let p2 = await this.productsService.getProduct(
      'e2a24279-27a6-4fab-a320-e8ca77849938',
    );
    let p3 = await this.productsService.getProduct(
      '538213ed-6e5e-4206-8675-c88dc87879ae',
    );
    let p4 = await this.productsService.getProduct(
      '9c2abd1b-542e-40fc-b239-ce2ce41d8b0f',
    );
    let p5 = await this.productsService.getProduct(
      '5c17eb76-2207-4644-b752-a6063c1fc8ef',
    );
    let p6 = await this.productsService.getProduct(
      '39c33489-ef29-4bfe-bdba-2636be3d3688',
    );
    let p7 = await this.productsService.getProduct(
      '37a416f7-65c4-4e7d-adb9-4da281744f0b',
    );

    this.products.push(p1);
    this.products.push(p2);
    this.products.push(p3);
    this.products.push(p4);
    this.products.push(p5);
    this.products.push(p6);
    this.products.push(p7);

    this.productResponse = {
      totalResults: this.products.length,
      results: this.products,
    };
  }
}
