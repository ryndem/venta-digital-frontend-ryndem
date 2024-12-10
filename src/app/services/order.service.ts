import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrdersBodyRequest } from 'app/model/orders-body-request';
import { ConfirmedOrderPage } from 'app/model/confirmed-order-page';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiPath: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }


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


  getById(orderId: string) {
    return firstValueFrom(this.httpClient.get<ConfirmedOrder>(`${this.apiPath}/Order/OrderDetails?IdOrder=${orderId}`));
  }
}
