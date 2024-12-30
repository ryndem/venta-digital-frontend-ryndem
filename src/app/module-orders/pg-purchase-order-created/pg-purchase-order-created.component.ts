import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrder } from 'app/model/purchase-order';
import { MetaService } from 'app/services/meta.service';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { environment } from 'environments/environment';

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
   * Booleand to track loading state
   */
  isLoading = true;
  
  /**
   * Purchase order id
   * @type {(string | null)}
   */
  purchaseOrderId: string | null = null;
  
  /**
   * Purchase order loaded
   * @type {(PurchaseOrder | null)}
   */
  order: PurchaseOrder | null = null;

  /**
   * Creates an instance of PgPurchaseOrderCreatedComponent.
   * @param {PurchaseOrderService} purchaseOrderService
   * @param {ActivatedRoute} currentRoute
   * @param {MetaService} metaService
   */
  constructor(
    private purchaseOrderService : PurchaseOrderService,
    private currentRoute: ActivatedRoute,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.purchaseOrderId = params['purchaseOrderId'];
      this.loadPurchaseOrder();
    });
  }

  /**
   * Method to load purchase order
   * @memberof PgPurchaseOrderCreatedComponent
   */
  async loadPurchaseOrder() {
    if( this.purchaseOrderId ) {
      this.order = await this.purchaseOrderService.getById(this.purchaseOrderId);
      this.isLoading = false;
    }
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Orden de Compra Creada - Proquifa',
      [
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
      ]
    );
  }
}
