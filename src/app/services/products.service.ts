import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from 'app/model/product';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { PriceOffert } from 'app/model/price-offert';
import { ProductResponse } from 'app/model/product-response';
import { Router } from '@angular/router';
import { SearchProductProps } from 'app/model-props/search-product-props';
import { SearchedProduct } from 'app/model-props/searched-product';
import { SearchParams } from 'app/model/search-params';
import { ProductOffertBodyRequest } from 'app/model/product-offert-body-request';
import { SearchProductRequest } from 'app/model/search-product';
import { Store } from '@ngrx/store';
import { addOutstandingProduct, updateProductsPage } from 'app/store/actions/product.actions';
import { updateIsOutstandingProductsLoading, updateIsProductsPageLoading } from 'app/store/actions/view.actions';


/**
 * Service to manage products API calls
 * @export
 * @class ProductsService
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  
  /**
   * Path for server error page
   * @private
   */
  private SERVER_ERROR_PAGE_PATH = '/server-error';

  /**
   * Creates an instance of ProductsService.
   * @param {AuthService} authService
   * @param {HttpClient} httpClient
   * @param {Router} router
   * @param {Store} store
   */
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router,
    private store: Store,
  ) {}


  /**
   * Gets product list page filtered by category
   * @param {SearchParams} searchParams
   * @return {Promise<ProductResponse>}
   */
  async listProductsByCategory(searchParams: SearchParams) {
    
    const body: SearchProductProps = {
      pageSize: searchParams.pageSize,
      desiredPage: searchParams.page,
      sortField: 'description',
      sortDirection: searchParams.sortDirection,
      filters: [
        {
          filterName: 'category',
          filterValue: searchParams.category,
        },
      ],
    };

    if (searchParams.q) {
      body.filters?.push({
        filterName: 'search',
        filterValue: searchParams.q,
      });
    }

    const apiPath: string = this.getApiPath();
    
    try {
      this.store.dispatch(updateIsProductsPageLoading({isProductsPageLoading: true}));
      const page = await firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
      this.store.dispatch(updateProductsPage({ productsPage: page}));
      this.store.dispatch(updateIsProductsPageLoading({isProductsPageLoading: false}));
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 500) {
        this.redirectToSeverErrorPage();
      }
      throw error;
    }
  }

  /**
   * Returns api path for the current user
   * @private
   * @return {*}  {string} 
   */
  private getApiPath(): string {
    if (this.authService.isAuthenticated()) {
      const customerId = this.authService.customerId();
      const addressId = this.authService.addressId();
      return `${environment.apiUrl}/ProductCustomer/${customerId}/${addressId}`;
    }

    return environment.apiUrl + '/ProductWeb';
  }

  /**
   * Get product page list
   * @param {SearchProductProps} props
   * @return {Promise<ProductResponse>}
   */
  async list(props: SearchProductProps): Promise<ProductResponse> {
    const apiPath: string = this.getApiPath();
    return firstValueFrom(
      this.httpClient.post<ProductResponse>(apiPath, props),
    );
  }

  /**
   * Loads outstanding products list
   */
  async listOutstandingProducts() {
    this.store.dispatch(updateIsOutstandingProductsLoading({ isOutstandingProductsLoading: true}));
    await this.addOutstandingProduct('2c2541b6-9294-4aad-bcc3-4540c1d5825a');
    await this.addOutstandingProduct('e2a24279-27a6-4fab-a320-e8ca77849938');
    await this.addOutstandingProduct('538213ed-6e5e-4206-8675-c88dc87879ae');
    await this.addOutstandingProduct('9c2abd1b-542e-40fc-b239-ce2ce41d8b0f');
    await this.addOutstandingProduct('5c17eb76-2207-4644-b752-a6063c1fc8ef');
    await this.addOutstandingProduct('39c33489-ef29-4bfe-bdba-2636be3d3688');
    await this.addOutstandingProduct('37a416f7-65c4-4e7d-adb9-4da281744f0b');
    await this.addOutstandingProduct('c9c8601e-18bf-4f26-b476-3894dbb41868');
    this.store.dispatch(updateIsOutstandingProductsLoading({ isOutstandingProductsLoading: false}));
  }

  private async addOutstandingProduct(productId: string) {
    try {
      const product = await this.getProduct(productId);
      this.store.dispatch(addOutstandingProduct({ outstandingProduct: product}));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Returns Outstanding product list
   * @param {string} productId
   * @return {Promise<ProductResponse>}
   */
  async listAlternativeProducts(productId: string): Promise<ProductResponse> {
    const body: SearchProductProps = {
      pageSize: 6,
      desiredPage: 1,
      sortField: 'description',
      sortDirection: 'ASC',
      filters: [
        {
          filterName: 'alternative',
          filterValue: productId,
        },
      ],
    };

    const apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

  /**
   * Returns complementary product list
   * @param {string} productId
   * @return {Promise<ProductResponse>}
   */
  async listComplementaryProducts(productId: string): Promise<ProductResponse> {
    const body: SearchProductProps = {
      pageSize: 6,
      desiredPage: 1,
      filters: [
        {
          filterName: 'complementary',
          filterValue: productId,
        },
      ],
    };
    const apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

  /**
   * Get product by id
   * @param {string} productId
   * @return {Promise<Product>} 
   */
  async getProduct(productId: string): Promise<Product> {
    let apiPath = `${environment.apiUrl}/ProductWeb/${productId}`;

    if (this.authService.isAuthenticated()) {
      const customerId = this.authService.customerId();
      const addressId = this.authService.addressId();
      apiPath = `${environment.apiUrl}/ProductCustomer/${productId}/${customerId}/${addressId}`;
    }

    try {
      return await firstValueFrom(this.httpClient.get<Product>(apiPath));
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) {
          this.redirectToSeverErrorPage();
        }
      }
      throw error;
    }
  }

  /**
   * Get product offer for authenticated products
   * @param {string} productId
   * @return {Promise<PriceOffert>}
   */
  async getProductOfferVD(productId: string): Promise<PriceOffert> {
    let apiPath = `${environment.apiUrl}/PriceOffer/PriceOfferWeb`;
    const body: ProductOffertBodyRequest = {
      IdProduct: productId,
      Pieces: 1,
    };
    if (this.authService.isAuthenticated()) {
      body.IdCustomer = this.authService.customerId();
      body.IdDeliveryAddress = this.authService.addressId();
      apiPath = `${environment.apiUrl}/PriceOffer/PriceOfferVD`;
    }

    return await firstValueFrom(this.httpClient.post<PriceOffert>(apiPath, body));
  }

  /**
   * Get product offer for non authenticated products
   * @param {string} productId
   * @return {Promise<PriceOffert>}
   */
  async getProductOfferWeb(productId: string): Promise<PriceOffert> {
    const apiPath = `${environment.apiUrl}/PriceOffer/PriceOfferWeb`;
    const body: ProductOffertBodyRequest = {
      IdProduct: productId,
      Pieces: 1,
    };

    return await firstValueFrom(this.httpClient.post<PriceOffert>(apiPath, body));
  }

  /**
   * Search product by search criteria
   * @param {string} search
   * @return {Promise<SearchedProduct[]>} 
   */
  async searchProducts(search: string): Promise<SearchedProduct[]> {
    const body: SearchProductRequest = {
      search,
      pageSize: 10,
      desiredPage: 1,
    };

    let apiPath: string = environment.apiUrl + '/ProductWeb/search';
    if (this.authService.isAuthenticated()) {
      body.idCustomer = this.authService.customerId();
      apiPath = environment.apiUrl + '/ProductCustomer/search';
    }

    return firstValueFrom(
      this.httpClient.post<SearchedProduct[]>(apiPath, body),
    );
  }

  /**
   * Retirect user to error page
   * @private
   */
  private redirectToSeverErrorPage() {
    this.router.navigate([ this.SERVER_ERROR_PAGE_PATH ]);
  }

}
