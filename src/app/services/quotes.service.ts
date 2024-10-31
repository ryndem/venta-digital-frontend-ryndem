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
    let body:any = {
      pageSize: 10,
      desiredPage: 1
    };

    if(folio && folio.length > 0) {
      body.filters = [{
        'FilterName': 'Folio',
        'FilterValue': folio
      }];
    }
    return firstValueFrom(this.httpClient.post<QuotePage>(this.apiPath + '/ListQuotation', body));
  }

}
