import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductResponse, ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private productsService: ProductsService) {}

  productResponse: ProductResponse | null = null;
  products: Product[] = [];

  async ngOnInit(): Promise<void> {

    this.productResponse = await this.productsService.listOutstandingProducts();
    this.products = this.productResponse.results;
  }

}
