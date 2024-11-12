import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuotePage } from 'app/model/quote-page';
import { ShoppingCart } from 'app/model/shopping-cart';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private apiPath: string = environment.apiUrl + '/Quotation';

  constructor(private httpClient: HttpClient) {}

  async getById(quoteId: string): Promise<ShoppingCart> {
    return firstValueFrom(this.httpClient.get<ShoppingCart>(`${this.apiPath}?idQuotation=${quoteId}`));
  }


  async getQuotes(folio: string|null): Promise<QuotePage> {
    const filters = [];

    if(folio && folio.length > 0) {
      filters.push({
        'FilterName': 'Folio',
        'FilterValue': folio
      });
    }
    return this.getQuotesByFilters(filters);
  }


  async getQuotesByAddressId(addressId: string): Promise<QuotePage> {
    const filters = [{
        'FilterName': 'IdAddress',
        'FilterValue': addressId
    }];
    
    return this.getQuotesByFilters(filters);
  }


  private getQuotesByFilters(filters: any[]) {
    const body:any = {
      pageSize: 10,
      desiredPage: 1
    };

    if(filters && filters.length > 0) {
      body.filters = filters;
    }
    return firstValueFrom(this.httpClient.post<QuotePage>(this.apiPath + '/ListQuotation', body));
  }


}
