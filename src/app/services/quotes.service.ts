import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuotePage } from 'app/model/quote-page';
import { QuoteFilter, QuotesBodyRequest } from 'app/model/quotes-body-request';
import { ShoppingCart } from 'app/model/shopping-cart';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

/**
 * Service to manage quotes API calls
 * @export
 * @class QuotesService
 */
@Injectable({
  providedIn: 'root',
})
export class QuotesService {

  /**
   * API base path for the quotes requests
   */
  private apiPath: string = environment.apiUrl + '/Quotation';

  /**
   * Creates an instance of QuotesService.
   * @param {HttpClient} httpClient
   */
  constructor(private httpClient: HttpClient) {}

  
  /**
   * Loads quote by id
   * @param {string} quoteId Quote id to load 
   * @return {Promise<ShoppingCart>}
   */
  async getById(quoteId: string): Promise<ShoppingCart> {
    return firstValueFrom(this.httpClient.get<ShoppingCart>(`${this.apiPath}?idQuotation=${quoteId}`));
  }


  /**
   * Get quote page 
   * @param {(string | null)} folio Quote folio to filter
   * @param {number} [pageSize=10] Quote page size
   * @param {number} [desiredPage=1]  Quote list page number
   * @return {Promise<QuotePage>}
   */
  async getQuotes(
    folio: string | null,
    pageSize = 10,
    desiredPage = 1,
  ): Promise<QuotePage> {
    const filters = [];

    if(folio && folio.length > 0) {
      filters.push({
        'FilterName': 'Folio',
        'FilterValue': folio
      });
    }
    return this.getQuotesByFilters(filters, pageSize, desiredPage);
  }

  /**
   * Gets quote page with address id filter
   * @param {string} addressId Address id to filter list
   * @param {number} [pageSize=10] Quote page size
   * @param {number} [desiredPage=1] Quote list page number
   * @return {Promise<QuotePage>} 
   */
  async getQuotesByAddressId(
    addressId: string,
    pageSize = 10,
    desiredPage = 1,
  ): Promise<QuotePage> {

    const filters = [{
      'FilterName': 'IdAddress',
      'FilterValue': addressId
    }];

    return this.getQuotesByFilters(filters, pageSize, desiredPage);
  }


  /**
   * Get quote page with filters
   * @param {QuoteFilter[]} filters Quote filters for the quote list page
   * @param {number} [pageSize=10] Quote page size
   * @param {number} [desiredPage=1] Quote list page number
   * @return {Promise<QuotePage>} 
   */
  private getQuotesByFilters(
    filters: QuoteFilter[],
    pageSize = 10,
    desiredPage = 1,
  ) {
    const body:QuotesBodyRequest = {
      pageSize,
      desiredPage,
      SortField: 'Folio',
      SortDirection: 'asc',
      filters: []
    };
    filters.push({
      'FilterName': 'IsCart',
      'FilterValue': false
    });
    filters.push({
      'FilterName': 'IsPurchaseOrder',
      'FilterValue': false
    });
    filters.push({
      'FilterName': 'Active',
      'FilterValue': true
    });

    body.filters = filters;
    return firstValueFrom(this.httpClient.post<QuotePage>(this.apiPath + '/ListQuotation', body));
  }


}
