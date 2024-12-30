import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrdersBodyRequest } from 'app/model/orders-body-request';
import { ConfirmedOrderPage } from 'app/model/confirmed-order-page';

/**
 * Service to manage orders API calls
 * @export
 * @class OrderService
 */
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  /**
   * API base path for the orders requests
   */
  private apiPath: string = environment.apiUrl;

  /**
   * Creates an instance of OrderService.
   * @param {HttpClient} httpClient
   */
  constructor(private httpClient: HttpClient) { }


  /**
   * Loads order by isClosed filter
   * @param {(string | null)} folio Order folio to filter request
   * @param {boolean} isClosed Bolean to specify the status of the confirmed order to load list
   * @return {*} 
   */
  async getOrders(folio: string | null, isClosed: boolean) {
    const body: OrdersBodyRequest = {
      pageSize: 100,
      desiredPage: 1,
      filters: []
    };
    const filters = [];

    filters.push({
      'FilterName': 'isClosed',
      'FilterValue': isClosed
    });

    if (folio && folio.length > 0) {
      filters.push({
        'FilterName': 'Folio',
        'FilterValue': folio
      });
    }
    body.filters = filters;

    return await firstValueFrom(this.httpClient.post<ConfirmedOrderPage>(this.apiPath + '/Order/ListOrder', body));
  }

  /**
   * Method to load order item by order id and quote id
   * @param {string} orderId Order id to load items
   * @param {string} quoteId Quote id to load items
   * @return {*} 
   */
  async getItemsByOrderId(orderId: string, quoteId: string) {
    const body: OrdersBodyRequest = {
      pageSize: 100,
      desiredPage: 1, 
      filters: [
        {
          FilterName: 'IdtpPedido',
          FilterValue: orderId
        }, {
          FilterName: 'IdcotCotizacion',
          FilterValue: quoteId
        }],
    };

    return await firstValueFrom(this.httpClient.post<OrderItemPage>(this.apiPath + '/Order/ListOrderItemsDetails', body));
  }



  /**
   * Loads order by id
   * @param {string} orderId Id from order to load
   * @return {*} 
   */
  getById(orderId: string) {
    return firstValueFrom(this.httpClient.get<ConfirmedOrder>(`${this.apiPath}/Order/OrderDetails?IdOrder=${orderId}`));
  }
}
