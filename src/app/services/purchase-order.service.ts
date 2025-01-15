import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItemPage } from 'app/model/order-item-page';
import { updateSelectedOrderItems } from 'app/store/actions/user.actions';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { PurchaseOrderForm } from 'app/model/purchase-order-form';
import { PurchaseOrderRequest } from 'app/model/purchase-order-body-request';
import { PurchaseOrderPage } from 'app/model/purchase-order-page';
import { UserState } from 'app/store/states/user.state';

/**
 * Service to manage purchase orders API calls
 * @export
 * @class PurchaseOrderService
 */
@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {

  /**
   * API base path for the purchase orders requests
   */
  private apiPath: string = environment.apiUrl;

  /**
   * Order form key to store in localstorage
   */
  private ORDER_FORM = 'purchase-order-form';


  /**
   * Creates an instance of PurchaseOrderService.
   * @param {HttpClient} httpClient
   * @param {Store<{ user: UserState }>} store
   */
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ user: UserState }>,
  ) {}


  /**
   * Method to save purchase order on the API
   * @param {string} customerId Purchase Order customer id
   * @param {string} contactCustomerId Purchase Order contact customer id
   * @param {string} purchaseOrderNumber Purchase order number
   * @param {string} idFile File id Uploaded
   * @param {{ IdQuotationItem: string; quantity: number; applyFleteExpress: boolean }[]} items Quote Item to include on the purchase order
   * @return {*} 
   */
  async create(
    customerId: string,
    contactCustomerId: string,
    purchaseOrderNumber: string,
    idFile: string,
    items: { IdQuotationItem: string; quantity: number; applyFleteExpress: boolean }[]
  ) {
   return await firstValueFrom(this.httpClient.post<PurchaseOrder>( this.apiPath + `/PurchaseOrder/PutPurchaseOrder?idCustomer=${customerId}&idContactCustomer=${contactCustomerId}&purchaseOrderNumber=${purchaseOrderNumber}&idFile=${idFile}&refresh=false`, items ));
  }

  /**
   * Method to calculate purchase order totals on the API
   * @param {string} customerId Purchase Order customer id
   * @param {string} contactCustomerId Purchase Order contact customer id
   * @param {string} purchaseOrderNumber Purchase order number
   * @param {string} idFile File id Uploaded
   * @param {{ IdQuotationItem: string; quantity: number; applyFleteExpress: boolean }[]} items Quote Item to include on the purchase order
   * @return {*} 
   */
  async calculateTotals(
    customerId: string,
    contactCustomerId: string,
    purchaseOrderNumber: string,
    idFile: string,
    items: { IdQuotationItem: string; quantity: number; applyFleteExpress: boolean }[]
  ) {
    return await firstValueFrom(this.httpClient.post<PurchaseOrder>( this.apiPath + `/PurchaseOrder/PutPurchaseOrder?idCustomer=${customerId}&idContactCustomer=${contactCustomerId}&purchaseOrderNumber=${purchaseOrderNumber}&idFile=${idFile}&refresh=true`, items ));
  }

  /**
   * Method to store locally the purchase order progress
   * @param {(PurchaseOrderForm | null)} purchaseOrderForm Purchase order form progress
   */
  async updateSelection(purchaseOrderForm: PurchaseOrderForm | null) {
    if (purchaseOrderForm && purchaseOrderForm.orderItems.length > 0) {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: true}));
      localStorage.setItem(this.ORDER_FORM, JSON.stringify(purchaseOrderForm));
    } else {
      this.store.dispatch(updateSelectedOrderItems({hasOrderItemsSelected: false}));
      localStorage.removeItem(this.ORDER_FORM);
    }
  }


  /**
   * Get purchase order form stored
   * @return {*} 
   */
  getOrderForm() {
    const selection = localStorage.getItem(this.ORDER_FORM);
    if( selection )
      return JSON.parse( selection );

    return null;
  }

  /**
   * Get purchase orders page
   * @param {(string | null)} folio Purchase order to filter
   * @param {number} pageSize Purchase order page size
   * @param {number} desiredPage  Purchase order page number
   * @return {*} 
   */
  async getPurchaseOrders(
    folio: string | null,
    pageSize: number,
    desiredPage: number
  ) {
    const body: PurchaseOrderRequest = {
      pageSize,
      desiredPage,
      filters: []
    };

    if(folio && folio.length > 0) {
      body.Folio = folio;
    }

    return await firstValueFrom(
      this.httpClient.post<PurchaseOrderPage>(
        this.apiPath + '/PurchaseOrder/ListPurchaseOrder', body
      )
    );
  }

  /**
   * Loads order items from purchase order
   * @param {string} purchaseOrderId Purchase order id to order items products
   * @return {*} 
   */
  async getItemsByPurchaseOrderId(purchaseOrderId: string, quoteId: string) {
    const body: PurchaseOrderRequest = {
      pageSize: 100,
      desiredPage: 1,
      filters: [
        {
          FilterName: 'idPurchaseOrder',
          FilterValue: purchaseOrderId
        }, {
          FilterName: 'idQuotation',
          FilterValue: quoteId
        }],
    };

    return await firstValueFrom(this.httpClient.post<OrderItemPage>(this.apiPath + '/PurchaseOrder/ListPurchaseOrderItemsDetails', body));
  }

  /**
   * Get purchase order by id
   * @param {string} purchaseOrderId Purchase order id to load
   * @return {*} 
   */
  getById(purchaseOrderId: string) {
    return firstValueFrom(this.httpClient.get<PurchaseOrder>(`${this.apiPath}/PurchaseOrder/PurchaseOrderDetails?IdPurchaseOrder=${purchaseOrderId}`));
  }
}
