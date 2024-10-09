import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from 'app/model/product';
import { environment } from 'environments/environment';

export type SearchProductProps = {
  pageSize: number,
  desiredPage: number,
  sortField?: string,
  sortDirection?: string,
  filters?: [
    {
      filterName?: string,
      filterValue?: string
    }
  ],
  suggestions?: [
    {
      fieldName?: string,
      suggestionValue?: string
    }
  ]
};

export type ProductResponse = {
  totalResults: number,
  results: Product[]
};

export type SearchedProduct = {
  idProduct: string,
  description: string
};


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }
  private apiPath: string = environment.apiUrl + '/ProductWeb';
  private PAGE_SIZE = 30;

  async listProductsByCategory(searchParams:any): Promise<ProductResponse> {

    const body: SearchProductProps = {
      pageSize: this.PAGE_SIZE,
      desiredPage: searchParams.page,
      sortField: 'description',
      sortDirection: searchParams.sortDirection
    };
    
    if(searchParams.category) {
      body.filters = [{
        filterName: 'category',
        filterValue: searchParams.category
      }]
    }

    if(searchParams.searchParam) {
      body.filters = [{
        filterName: 'category',
        filterValue: searchParams.category
      }]
    }

    return firstValueFrom(this.httpClient.post<ProductResponse>(this.apiPath, body));
  }






  async list(props: SearchProductProps): Promise<ProductResponse> {
    return firstValueFrom(this.httpClient.post<ProductResponse>(this.apiPath, props));
  }

  async listOutstandingProducts(): Promise<ProductResponse> {

    const body: SearchProductProps = {
      pageSize: 10,
      desiredPage: 1,
      filters: [{
        filterName: "string",
        filterValue: "string"
      }],
      suggestions: [{
        fieldName: "string",
        suggestionValue: "string"
      }]
    };

    return firstValueFrom(this.httpClient.post<ProductResponse>(this.apiPath, body));
  }





  async listAlternativeProducts(productId: string): Promise<Product[]> {
    return firstValueFrom(this.httpClient.post<Product[]>(this.apiPath, {}));
  }

  async listComplementaryProducts(productId: string):Promise<Product[]> {
    return firstValueFrom(this.httpClient.get<Product[]>(this.apiPath, {}));
  }

  async getProduct(productId: string): Promise<Product> {
    return firstValueFrom(this.httpClient.get<Product>(`${this.apiPath}/${productId}`));
  }

  async searchProducts(search: string): Promise<SearchedProduct[]> {
    const body = {
      search
    };

    return firstValueFrom(this.httpClient.post<SearchedProduct[]>(`${this.apiPath}/Search`, body));
  }

}
