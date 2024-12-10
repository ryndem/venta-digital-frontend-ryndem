import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';
import { addOutstandingProduct } from 'app/store/products/product.actions';
import { ProductState } from 'app/store/products/product.reducer';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private store: Store<{ product: ProductState} >
  ) {

    this.store.subscribe((state) => {
      if(state.product.outstandingProducts) {
        this.productResponse = {
          totalResults: state.product.outstandingProducts.length,
          results: state.product.outstandingProducts,
        };
      }
    });

  }

  productResponse: ProductResponse | null = null;
  isLoadingProducts = false;
  skeletonList = Array(4).fill(0);

  async ngOnInit(): Promise<void> {
    this.isLoadingProducts = true;
    try {
      await this.loadOutstandingProducts();
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoadingProducts = false;
    }
  }

  async loadOutstandingProducts() {
    if(this.productResponse) {
      return;
    }

    this.addProduct('2c2541b6-9294-4aad-bcc3-4540c1d5825a');
    this.addProduct('e2a24279-27a6-4fab-a320-e8ca77849938');
    this.addProduct('538213ed-6e5e-4206-8675-c88dc87879ae');
    this.addProduct('9c2abd1b-542e-40fc-b239-ce2ce41d8b0f');
    this.addProduct('5c17eb76-2207-4644-b752-a6063c1fc8ef');
    this.addProduct('39c33489-ef29-4bfe-bdba-2636be3d3688');
    this.addProduct('37a416f7-65c4-4e7d-adb9-4da281744f0b');
    this.addProduct('c9c8601e-18bf-4f26-b476-3894dbb41868');

  }

  private async addProduct(productId: string) {
    try {
      const product = await this.productsService.getProduct(productId);
      if (product) {
        this.store.dispatch(addOutstandingProduct({ outstandingProduct: product}));
      }
    } catch( error ) {
      console.error(error);
    }
  }
}
