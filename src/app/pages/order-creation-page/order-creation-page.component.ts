import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuotesService } from 'app/services/quotes.service';
import { Address } from 'app/model/address';
import { Quote } from 'app/model/quote';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuoteProduct } from 'app/model/quote-product';
import { OrderService } from 'app/services/order.service';
import { OrderFile } from 'app/model/order-file';
import { NotificationService } from 'app/services/notification.service';
import { Order } from 'app/model/order';

@Component({
  selector: 'order-creation-page',
  templateUrl: './order-creation-page.component.html',
  styleUrl: './order-creation-page.component.scss',
})
export class OrderCreationPageComponent {
  
  selectedAddress: Address | null = null;
  quotes: Quote[] = [];
  selectedQuote: ShoppingCart | null = null;
  isQuotesLoading: boolean = false;
  isCreatingOrder: boolean = false;
  customerId: string | null = null;
  contactId: string | null = null;

  tabFilter: string = 'available';
  textFilter: string = '';

  availableProducts: QuoteProduct[] = [];
  selectedProducts: any[] = [];
  selectedItems: string[] = [];
  
  fileId: string = '';
  purchaseOrderNumber: string = '';
  

  constructor(
    private quoteService: QuotesService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      if(state.user.user) {
        this.customerId = state.user.user.idCustomer;
        this.contactId = state.user.user.idContactCustomer;
      }
    });
  }

  async onAddressSelected(address: any) {
    this.isQuotesLoading = true;
    this.selectedAddress = address;

    let quotePage = await this.quoteService.getQuotesByAddressId(address.idAddress);
    this.quotes = quotePage.results;
    
    this.selectedQuote = null;
    if (this.quotes.length > 0)
      await this.selectQuote(this.quotes[0]);
    
    this.isQuotesLoading = false;
    this.updateProducts();
  }
  
  async selectQuote(quote: Quote) {
    this.selectedQuote = await this.quoteService.getById(quote.idQuotation);
    this.updateProducts();
  }


  updateTab(tab:string) {
    this.tabFilter = tab;
    this.updateProducts();
  }
  updateProducts() {
    this.availableProducts =  this.selectedQuote? this.updateAvailableProducts(this.selectedQuote?.listQuotationItem) : [];
    this.availableProducts = this.availableProducts.filter(p => !this.selectedItems.includes(p.idQuotationItem));

    //this.selectedProducts = this.selectedProducts.filter(p => this.selectedItems.includes(p.idQuotationItem));
  }

  updateAvailableProducts(products: QuoteProduct[]) : QuoteProduct[] {
    let result = products;

    // tab filters
    if ( this.tabFilter === 'available' ) {
      result = result.filter(item => !item.inPurchaseOrder);
    } else if ( this.tabFilter === 'in-order' ) {
      result = result.filter(item => item.inPurchaseOrder);
    }

    // text filter
    if( this.textFilter.length > 0 ) {
      result = result.filter( item => {
        let result = item.cas.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.catalog.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.brandName?.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.description.toLowerCase().includes(this.textFilter.toLowerCase());

        return result;
      });
    }

    return result;
  }

  onAddToOrderEmitter(quoteItemId: string) {
    if (!this.selectedItems.includes(quoteItemId)) {
      this.selectedItems.push(quoteItemId);
      this.selectedProducts.push({
        quoteFolio: this.selectedQuote?.quotationDetails.folio,
        item: this.selectedQuote?.listQuotationItem.find(i => i.idQuotationItem == quoteItemId)

      });
      this.updateProducts();
    }
  }

  onRemoveToOrderEmitter(quoteItemId: string) {
    if (this.selectedItems.includes(quoteItemId)) {
      this.selectedItems = this.selectedItems.filter( i => i !== quoteItemId );
      this.selectedProducts = this.selectedProducts.filter( p => p.item.idQuotationItem !== quoteItemId);
      this.updateProducts();
    }
  }

  onFileUploaded(orderFile: OrderFile) {
    this.fileId = orderFile.idFile;
  }


  async createOrder() {
    if( !this.isCreatingOrder && 
          this.customerId && 
          this.contactId && 
          this.fileId && 
          this.selectedItems.length > 0 ) {

      this.isCreatingOrder = true;
      try {
        let order: Order = await this.orderService.create(this.customerId, 
              this.contactId, 
              this.purchaseOrderNumber, 
              this.fileId, 
              this.selectedItems);
              this.notificationService.showSuccess('Orden creada');

        this.router.navigate(['purchase-orders/created'], {
          queryParams: {
            purchaseOrderId: order.idPurchaseOrder
          }
        });
      } catch (error) {
        this.notificationService.showError('Error al crear orden');
        this.isCreatingOrder = false
      }

    }

  }
}
