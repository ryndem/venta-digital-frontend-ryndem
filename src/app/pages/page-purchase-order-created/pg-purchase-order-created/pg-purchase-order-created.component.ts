import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { loadPurchaseOrderById } from 'app/store/actions/order.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectPurchaseOrderDetails } from 'app/store/selectors/order.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to show purchase order creation confirmation
 * @export
 * @class PgPurchaseOrderCreatedComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pg-purchase-order-created',
  templateUrl: './pg-purchase-order-created.component.html',
  styleUrls: ['./pg-purchase-order-created.component.scss'],
})
export class PgPurchaseOrderCreatedComponent implements OnInit {

  /**
   * Purchase order id
   * @type {(string | null)}
   */
  purchaseOrderId: string | null = null;

  order$: Observable<PurchaseOrder | null>;

  /**
   * Creates an instance of PgPurchaseOrderCreatedComponent.
   * @param {ActivatedRoute} currentRoute
   * @param {Store} store
   */
  constructor(
    private currentRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.order$ = this.store.select(selectPurchaseOrderDetails(this.purchaseOrderId || ''));
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.purchaseOrderId = params['purchaseOrderId'];
      this.order$ = this.store.select(selectPurchaseOrderDetails(this.purchaseOrderId || ''));
      this.loadPurchaseOrder();
    });
  }

  /**
   * Method to load purchase order
   */
  async loadPurchaseOrder() {
    if( this.purchaseOrderId ) {
      this.store.dispatch(loadPurchaseOrderById({purchaseOrderId: this.purchaseOrderId}));
    }
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({pageTitle: 'Orden de Compra Creada - Proquifa', tags: [
      {
        name: 'description',
        content: 'Tu orden de compra ha sido creada exitosamente y se encuentra en proceso. Consulta los detalles de tu pedido y su estado actual en Proquifa.',
      },
      {
        name: 'keywords',
        content: 'orden de compra creada, pedido en proceso, detalles de la orden, Proquifa',
      },
      {
        property: 'og:title',
        content: 'Orden de Compra Creada - Proquifa',
      },
      {
        property: 'og:description',
        content: 'La orden de compra ha sido creada y está en proceso. Consulta los detalles del pedido en Proquifa.',
      },
      {
        property: 'og:url',
        content: `${environment.baseUrl}/purchase-orders/created`,
      },
      {
        name: 'twitter:title',
        content: 'Orden de Compra Creada - Proquifa',
      },
      {
        name: 'twitter:description',
        content: 'Tu orden de compra ha sido creada y se encuentra en proceso. Consulta todos los detalles en Proquifa.',
      },
      {
        property: 'twitter:url',
        content: `${environment.baseUrl}/purchase-orders/created`,
      },
    ]}));
  }
}
