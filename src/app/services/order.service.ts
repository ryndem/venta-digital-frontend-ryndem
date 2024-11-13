import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'app/model/order';
import { QuotePage } from 'app/model/quote-page';
import { ShoppingCart } from 'app/model/shopping-cart';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiPath: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  async create(customerId: string, contactCustomerId: string, purchaseOrderNumber: string, idFile: string, items: string[] ) {

   return await firstValueFrom(this.httpClient.post<Order>( this.apiPath + `/PurchaseOrder/PutPurchaseOrder?idCustomer=${customerId}&idContactCustomer=${contactCustomerId}&purchaseOrderNumber=${purchaseOrderNumber}&idFile=${idFile}`, items ));
  }


  async getOrders(folio: string|null) {
    const body:any = {
      pageSize: 100,
      desiredPage: 1
    };

    if(folio && folio.length > 0) {
      body.Folio = folio;
    }

    return await firstValueFrom(this.httpClient.post<QuotePage>(this.apiPath + '/PurchaseOrder/ListPurchaseOrder', body));
  }

  getById(purchaseOrderId: string) {
    return firstValueFrom(this.httpClient.get<Order>(`${this.apiPath}/PurchaseOrder/PurchaseOrderDetails?IdPurchaseOrder=${purchaseOrderId}`));
  }
}
