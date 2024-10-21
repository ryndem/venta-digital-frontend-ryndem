import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from 'app/model/product';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { PriceOffert } from 'app/model/price-offert';

export type SearchProductProps = {
  pageSize: number;
  desiredPage: number;
  sortField?: string;
  sortDirection?: string;
  filters?: [
    {
      filterName?: string;
      filterValue?: string;
    },
  ];
  suggestions?: [
    {
      fieldName?: string;
      suggestionValue?: string;
    },
  ];
};

export type ProductResponse = {
  totalResults: number;
  results: Product[];
};

export type SearchedProduct = {
  idProducto: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {}

  private PAGE_SIZE = 30;

  async listProductsByCategory(searchParams: any): Promise<ProductResponse> {
    const body: SearchProductProps = {
      pageSize: this.PAGE_SIZE,
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
        filterName: 'description',
        filterValue: searchParams.q,
      });
    }

    let apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

  private getApiPath(): string {
    if (this.authService.isAuthenticated()) {
      let customerId = this.authService.customerId();
      let addressId = this.authService.addressId();
      return `${environment.apiUrl}/ProductCustomer/${customerId}/${addressId}`;
    }

    return environment.apiUrl + '/ProductWeb';
  }

  async list(props: SearchProductProps): Promise<ProductResponse> {
    let apiPath: string = this.getApiPath();
    return firstValueFrom(
      this.httpClient.post<ProductResponse>(apiPath, props),
    );
  }

  async listOutstandingProducts(): Promise<ProductResponse> {
    const body: SearchProductProps = {
      pageSize: 8,
      desiredPage: 1,
      filters: [
        {
          filterName: 'string',
          filterValue: 'string',
        },
      ],
      suggestions: [
        {
          fieldName: 'string',
          suggestionValue: 'string',
        },
      ],
    };
    let apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

  async listAlternativeProducts(productId: string): Promise<ProductResponse> {
    const body: SearchProductProps = {
      pageSize: 6,
      desiredPage: 1,
      sortField: 'description',
      sortDirection: 'ASC',
      filters: [
        {
          filterName: 'supplementary',
          filterValue: productId,
        },
      ],
    };

    let apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

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
    let apiPath: string = this.getApiPath();
    return firstValueFrom(this.httpClient.post<ProductResponse>(apiPath, body));
  }

  async getProduct(productId: string): Promise<Product> {
    let apiPath: string = `${environment.apiUrl}/ProductWeb/${productId}`;

    if (this.authService.isAuthenticated()) {
      let customerId = this.authService.customerId();
      let addressId = this.authService.addressId();
      apiPath = `${environment.apiUrl}/ProductCustomer/${productId}/${customerId}/${addressId}`;
    }

    return firstValueFrom(this.httpClient.get<Product>(apiPath));
  }

  async getProductOffer(productId: string): Promise<PriceOffert> {
    let apiPath: string = `${environment.apiUrl}/ProductWeb/${productId}`;
    let body: any = {};

    if (this.authService.isAuthenticated()) {
      body = {
        IdProduct: productId,
        IdCustomer: this.authService.customerId(),
        IdDeliveryAddress: this.authService.addressId(),
        Pieces: 1,
      };
      apiPath = `${environment.apiUrl}/PriceOffer/PriceOfferWeb`;
    }

    return firstValueFrom(this.httpClient.post<PriceOffert>(apiPath, body));
  }

  async searchProducts(search: string): Promise<SearchedProduct[]> {
    const body: any = {
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
}
