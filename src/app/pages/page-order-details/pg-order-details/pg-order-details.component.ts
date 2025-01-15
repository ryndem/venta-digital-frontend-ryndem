import { Component, Input as RouterInput } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItem } from 'app/model/order-item';
import { loadConfirmedOrderById } from 'app/store/actions/order.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectConfirmedOrderDetails } from 'app/store/selectors/order.selectors';
import { ViewState } from 'app/store/states/view.state';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display order details
 * @export
 * @class PgOrderDetailsComponent
 */
@Component({
  selector: 'pg-order-details',
  templateUrl: './pg-order-details.component.html',
  styleUrls: ['./pg-order-details.component.scss'],
})
export class PgOrderDetailsComponent {

  /**
   * Order id to show
   * @type {string}
   */
  orderId!: string;

  /**
   * List of all order items
   * @type {(OrderItem[] | null)}
   */
  orderItems: OrderItem[] | null = null;

  /**
   * Order items filtered
   * @type {(OrderItem[] | null)}
   */
  filteredOrderItems: OrderItem[] | null = null;

  /**
   * Selected quote id
   * @type {(string | null)}
   */
  selectedQuoteId: string | null = null;

  /**
   * Boolean to track items loading state
   */
  isLoadingItems = false;

  /**
   * Store reference (order.orders(id))
   */
  order$: Observable<ConfirmedOrder | null>;

  /**
   * Method to set order id from url
   */
  @RouterInput('orderId')
  set setInputId(orderId: string) {
    this.orderId = orderId;
    this.order$ = this.store.select(selectConfirmedOrderDetails(this.orderId));
    this.store.dispatch(loadConfirmedOrderById({confirmedOrderId: this.orderId}));
  }
  
  /**
   * Creates an instance of PgOrderDetailsComponent.
   * @param {OrderService} orderService
   * @param {Store<ViewState>} store
   */
  constructor(
    private store: Store<ViewState>,
  ) {
    this.order$ = this.store.select(selectConfirmedOrderDetails(this.orderId));
    this.setMetaTags();
   }


  /**
   * Method to filter order items
   */
  async filterItems() {
    if (this.orderItems) {
      this.filteredOrderItems = this.orderItems.filter(oi => oi);
    }
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: `Detalles de Orden de Compra #${this.orderId} - Proquifa`, 
      tags: [
        {
          name: 'description',
          content: `Consulta los detalles de la Orden de Compra #${this.orderId}. Revisa las partidas por cotización, montos totales y detalles del cliente en Proquifa.`,
        },
        {
          name: 'keywords',
          content: `detalles de orden de compra, orden #${this.orderId}, partidas por cotización, montos totales, Proquifa`,
        },
        {
          property: 'og:title',
          content: `Detalles de Orden de Compra #${this.orderId} - Proquifa`,
        },
        {
          property: 'og:description',
          content: `Consulta las partidas de la Orden de Compra #${this.orderId}. Revisa montos totales y detalles del cliente.`,
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/orders/${this.orderId}`,
        },
        {
          name: 'twitter:title',
          content: `Detalles de Orden de Compra #${this.orderId} - Proquifa`,
        },
        {
          name: 'twitter:description',
          content: `Revisa las partidas de la Orden de Compra #${this.orderId}, incluyendo montos y detalles del cliente en Proquifa.`,
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/orders/${this.orderId}`,
        },
      ]
    }));
  }
}
