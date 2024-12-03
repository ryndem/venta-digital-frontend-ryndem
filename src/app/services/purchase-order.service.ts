import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { QuotePage } from 'app/model/quote-page';
import { OrderItemPage } from 'app/model/order-item-page';
import { updateSelectedOrderItems } from 'app/store/users/user.actions';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { PurchaseOrderForm } from 'app/model/purchase-order-form';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private apiPath: string = environment.apiUrl;
  private ORDER_FORM = 'purchase-order-form';

  constructor(
    private httpClient: HttpClient,
    private store: Store<any>,
  ) {}

  async create(customerId: string, contactCustomerId: string, purchaseOrderNumber: string, idFile: string, items: any[] ) {
   return await firstValueFrom(this.httpClient.post<PurchaseOrder>( this.apiPath + `/PurchaseOrder/PutPurchaseOrder?idCustomer=${customerId}&idContactCustomer=${contactCustomerId}&purchaseOrderNumber=${purchaseOrderNumber}&idFile=${idFile}&refresh=false`, items ));
  }

  async calculateTotals(customerId: string, contactCustomerId: string, purchaseOrderNumber: string, idFile: string, items: any[] ) {
    return await firstValueFrom(this.httpClient.post<PurchaseOrder>( this.apiPath + `/PurchaseOrder/PutPurchaseOrder?idCustomer=${customerId}&idContactCustomer=${contactCustomerId}&purchaseOrderNumber=${purchaseOrderNumber}&idFile=${idFile}&refresh=true`, items ));
  }

  async updateSelection(purchaseOrderForm: PurchaseOrderForm | null) {
    if (purchaseOrderForm && purchaseOrderForm.orderItems.length > 0) {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: true}));
      localStorage.setItem(this.ORDER_FORM, JSON.stringify(purchaseOrderForm));
    } else {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: false}));
      localStorage.removeItem(this.ORDER_FORM);
    }
  }

  getOrderForm() {
    const selection = localStorage.getItem(this.ORDER_FORM);
    if( selection )
      return JSON.parse( selection );

    return null;
  }

  async getPurchaseOrders(
    folio: string | null,
    pageSize: number,
    desiredPage: number
  ) {
    const body:any = {
      pageSize,
      desiredPage
    };

    if(folio && folio.length > 0) {
      body.Folio = folio;
    }

    return await firstValueFrom(
      this.httpClient.post<QuotePage>(
        this.apiPath + '/PurchaseOrder/ListPurchaseOrder', body
      )
    );
  }

  async getProductsByPurchaseOrderId(purchaseOrderId: string) {
    const body:any = {
      pageSize: 100,
      desiredPage: 1,
      orderId: purchaseOrderId // FIXME 
    };

    return await firstValueFrom(this.httpClient.post<OrderItemPage>(this.apiPath + '/PurchaseOrder/ListPurchaseOrderItemsDetails', body));
  }

  getById(purchaseOrderId: string) {
    return firstValueFrom(this.httpClient.get<PurchaseOrder>(`${this.apiPath}/PurchaseOrder/PurchaseOrderDetails?IdPurchaseOrder=${purchaseOrderId}`));
  }
}
