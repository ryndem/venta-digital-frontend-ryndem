import { Component, Input as RouterInput } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { OrderItem } from 'app/model/order-item';
import { Quote } from 'app/model/quote';
import { MetaService } from 'app/services/meta.service';
import { OrderService } from 'app/services/order.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'pg-order-details',
  templateUrl: './pg-order-details.component.html',
  styleUrls: ['./pg-order-details.component.scss'],
})
export class PgOrderDetailsComponent {

  orderId!: string;

  order: ConfirmedOrder | null = null;
  orderItems: OrderItem[] | null = null;
  filteredOrderItems: OrderItem[] | null = null;
  selectedQuoteId: string | null = null;
  isLoadingItems = false;

  @RouterInput('orderId')
  set setInputId(orderId: string) {
    this.orderId = orderId;
    this.loadOrder();
  }

  constructor(
    private orderService: OrderService,
    private metaService: MetaService
  ) {
    this.setMetaTags();
   }

  async loadOrder() {
    this.order = await this.orderService.getById(this.orderId);
    this.loadItems();
  }

  async selectQuote(quote: Quote | null) {
    this.selectedQuoteId = quote? quote.idQuotation : null;
    this.loadItems();
  }

  async loadItems() {
    if (this.selectedQuoteId) {
      this.isLoadingItems = true;
      const itemsPage = await this.orderService.getItemsByOrderId(this.orderId, this.selectedQuoteId);
      this.orderItems = itemsPage.results;
      this.filterItems();
      this.isLoadingItems = false;
    }
  }

  async filterItems() {
    if (this.orderItems) {
      this.filteredOrderItems = this.orderItems.filter(oi => oi);
    }
  }

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      `Detalles de Orden de Compra #${this.orderId} - Proquifa`,
      [
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
    );
  }
}
