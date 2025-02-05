import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuoteItem } from 'app/model/quote';
import { QuotePage } from 'app/model/quote-page';
import { QuoteFilter, QuotesBodyRequest } from 'app/model/quotes-body-request';
import { ShoppingCart } from 'app/model/shopping-cart';
import { updateIsLoadingOrders, updateOrderList } from 'app/store/actions/order.actions';
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
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}


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
  ) {
    const filters = [];

    if(folio && folio.length > 0) {
      filters.push({
        'FilterName': 'Folio',
        'FilterValue': folio
      });
    }
    this.store.dispatch(updateIsLoadingOrders({isLoadingOrders: true}));
    const quotePage = await this.getQuotesByFilters(filters, pageSize, desiredPage);

    const quotes: QuoteItem[] = quotePage.results.map(quote => {
      return {
        id: quote.idQuotation,
        folio: quote.folio,
        registrationDate: quote.registrationDate,
        items: quote.items,
        total: quote.total,
        expirationDate: quote.expirationDate,
        isValid: quote.isValid
      }
    })
    this.store.dispatch(updateOrderList({orderList: quotes}));
    this.store.dispatch(updateIsLoadingOrders({isLoadingOrders: false}));
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
