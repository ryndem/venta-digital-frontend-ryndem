import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';
import { addOutstandingProduct } from 'app/store/actions/product.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectOutstandingProducts } from 'app/store/selectors/product.selectors';
import { ProductState } from 'app/store/states/product.state';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display home
 * @export
 * @class PgHomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './pg-home.component.html',
  styleUrls: ['./pg-home.component.scss'],
})
export class PgHomeComponent implements OnInit {

  /**
   * Boolean to track loading state
   */
  isLoadingProducts = false;

  /**
   * Skeleton collection
   */
  skeletonList = Array(4).fill(0);

  /**
   * Product page response
   * @type {(ProductResponse | null)}
   */
  productResponse: ProductResponse | null = null;

  /**
  * Store reference (product.outstandingProducts)
  */
  outstandingProducts$: Observable<Product[] | null>;

  /**
   * Creates an instance of PgHomeComponent.
   * @param {ProductsService} productsService
   * @param {Store<{ product: ProductState} >} store
   */
  constructor(
    private productsService: ProductsService,
    private store: Store<{ product: ProductState} >
  ) {
    this.outstandingProducts$ = this.store.select(selectOutstandingProducts);
    
    this.outstandingProducts$.subscribe(value => {
      if(value) {
        this.productResponse = {
          totalResults: value.length,
          results: value
        };
      }
    })
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
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

  /**
   * Method to load outstanding products
   * @return {*} 
   */
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


  /**
   * Method to handle add loaded product to outstanding product cart
   * @private
   * @param {string} productId
   */
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

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Dynamic Page - Proquifa', 
      tags: [
        {
          property: 'og:url',
          content: environment.baseUrl,
        },
        {
          property: 'twitter:url',
          content: environment.baseUrl,
        },
      ]
    }));
  }
}
