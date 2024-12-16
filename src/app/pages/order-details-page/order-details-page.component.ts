import { Component, Input as RouterInput } from '@angular/core';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { Quote } from 'app/model/quote';
import { QuoteProduct } from 'app/model/quote-product';
import { OrderService } from 'app/services/order.service';
import { PurchaseOrder } from '../../model/purchase-order';

@Component({
  selector: 'order-details-page',
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss'],
})
export class OrderDetailsPageComponent {
  orderId!: string;
  order: ConfirmedOrder | null = null;
  summaryInfo!: PurchaseOrder;
  orderItems: QuoteProduct[] | null = null;
  filteredOrderItems: QuoteProduct[] | null = null;
  selectedQuoteId: string | null = null;
  isLoadingItems = false;

  @RouterInput('orderId')
  set setInputId(orderId: string) {
    this.orderId = orderId;
    this.loadOrder();
  }

  constructor(private orderService: OrderService) {}

  async loadOrder() {
    this.order = await this.orderService.getById(this.orderId);
    this.buildSummaryCardInfo(this.order);
    this.loadItems();
  }

  async selectQuote(quote: Quote | null) {
    this.selectedQuoteId = quote ? quote.idQuotation : null;
    this.loadItems();
  }

  async loadItems() {
    if (this.selectedQuoteId) {
      this.isLoadingItems = true;
      const itemsPage = await this.orderService.getItemsByOrderId(
        this.orderId,
        this.selectedQuoteId
      );
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

  buildSummaryCardInfo(confirmedOrder: ConfirmedOrder): void {
    this.summaryInfo = {
      folio: confirmedOrder.folio,
      idPurchaseOrder: confirmedOrder.idOrder,
      address: confirmedOrder.address,
      idPurchaseOrderFile: confirmedOrder.idFilePDF,
      itemCount: confirmedOrder.itemCount,
      subtotal: confirmedOrder.subtotal,
      total: confirmedOrder.totalAmount,
      saleTax: confirmedOrder.totalVAT,
      registrationDate: confirmedOrder.registrationDate,
      idOCFilePDF: confirmedOrder.idOCFilePDF,
      freightExpressDetails: {
        amount: confirmedOrder.expressFreightTotal,
        itemCount: confirmedOrder.expressFreightItems,
      },
      freightOutsiderDetails: {
        amount: confirmedOrder.lastMileFreightTotal,
        itemCount: confirmedOrder.itemCount,
      },
    };
  }
}
