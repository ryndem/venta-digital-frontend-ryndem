import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuotesService } from 'app/services/quotes.service';
import { Address } from 'app/model/address';
import { Quote } from 'app/model/quote';
import { ShoppingCart } from 'app/model/shopping-cart';
import { QuoteProduct } from 'app/model/quote-product';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { OrderFile } from 'app/model/order-file';
import { NotificationService } from 'app/services/notification.service';
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItem, PurchaseOrderForm } from 'app/model/purchase-order-form';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'purchase-order-creation-page',
  templateUrl: './purchase-order-creation-page.component.html',
  styleUrls: ['./purchase-order-creation-page.component.scss'],
})
export class PurchaseOrderCreationPageComponent {

  private PAGE_SIZE = 6;

  quotes: Quote[] = [];
  availableProducts: QuoteProduct[] = [];

  selectedAddressId: string | null = null;
  selectedQuote: ShoppingCart | null = null;
  selectedProducts: OrderItem[] = [];

  purchaseOrderForm: PurchaseOrderForm = {
    addressId: '',
    purchaseOrderNumber: '',
    idFile: '',
    orderItems: []
  };

  isQuotesLoading = false;
  isUpdatingTotals = false;
  isItemsLoading = false;
  isCreatingOrder = false;

  customerId: string | null = null;
  contactId: string | null = null;

  tabFilter = 'available';
  textFilter = '';
  totals: { subtotal: number; saleTax: number; total: number } = {
    subtotal: 0,
    saleTax: 0,
    total: 0
  };

  fileId = '';
  purchaseOrderNumber = '';

  currentPage = 1;
  totalPages = 0;


  constructor(
    private quoteService: QuotesService,
    private purchaseOrderService: PurchaseOrderService,
    private notificationService: NotificationService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      if(state.user.user) {
        this.customerId = state.user.user.idCustomer;
        this.contactId = state.user.user.idContactCustomer;

        if(state.user.hasOrderItemsSelected && this.selectedProducts.length === 0) {
          this.initSavedState();
        }

      }
    });
  }

  async initSavedState() {
    const orderForm = this.purchaseOrderService.getOrderForm();

    if( orderForm ) {
      await this.setAddressSelected( orderForm.addressId );
      this.selectedProducts = orderForm.orderItems;
      this.fileId = orderForm.idFile;
      this.purchaseOrderNumber = orderForm.purchaseOrderNumber;
    }
  }

  async onAddressSelected(address: Address | null) {
    if(!address) return;
    this.selectedProducts = [];
    await this.setAddressSelected(address.idAddress);
  }

  async setAddressSelected(addressId: string) {
    this.isQuotesLoading = true;
    this.selectedAddressId = addressId;

    this.selectedQuote = null;
    this.availableProducts = [];

    const quotePage = await this.quoteService.getQuotesByAddressId(addressId, this.PAGE_SIZE);
    this.currentPage = 1;
    this.totalPages = Math.ceil(quotePage.totalResults / this.PAGE_SIZE);
    this.quotes = quotePage.results;

    this.isQuotesLoading = false;

    if (this.quotes.length > 0) {
      await this.selectQuote(this.quotes[0]);
    } else {
      this.updateProducts();
    }
  }

  async quotesPageChange(newPage: number) {
    if(!this.selectedAddressId) return;

    this.isQuotesLoading = true;
    const quotePage = await this.quoteService.getQuotesByAddressId(
      this.selectedAddressId,
      this.PAGE_SIZE,
      newPage,
    );
    this.currentPage = newPage;
    this.totalPages = Math.ceil(quotePage.totalResults / this.PAGE_SIZE);
    this.quotes = quotePage.results;
    this.isQuotesLoading = false;
  }

  async selectQuote(quote: Quote) {
    this.isItemsLoading = true;
    this.availableProducts = [];
    this.selectedQuote = await this.quoteService.getById(quote.idQuotation);
    this.updateProducts();
    this.isItemsLoading = false;
  }


  updateTab(tab:string) {
    this.tabFilter = tab;
    this.updateProducts();
  }

   updateProducts() {
    if(this.selectedAddressId) {
      this.availableProducts =  this.selectedQuote? this.updateAvailableProducts(this.selectedQuote?.listQuotationItem) : [];
      this.availableProducts = this.availableProducts.filter(p => this.selectedProducts.findIndex(pi => pi.item.idQuotationItem == p.idQuotationItem)<0);

      this.purchaseOrderForm.purchaseOrderNumber = this.purchaseOrderNumber.trim();
      this.purchaseOrderForm.orderItems = this.selectedProducts;
      this.purchaseOrderForm.addressId = this.selectedAddressId;
      this.purchaseOrderForm.idFile = this.fileId;
      this.purchaseOrderService.updateSelection(this.purchaseOrderForm);

      this.updateTotals();
    }
  }

  async updateTotals() {
    if(this.customerId && this.contactId && !this.isUpdatingTotals) {
      this.isUpdatingTotals = true;

      try {
        const summary: PurchaseOrder = await this.purchaseOrderService.calculateTotals(
          this.customerId,
          this.contactId,
          this.purchaseOrderNumber.trim(),
          this.fileId,
          this.selectedProducts.map(p => {
            return {
              IdQuotationItem: p.item.idQuotationItem,
              quantity: p.quantity,
              applyFleteExpress: p.applyFleteExpress
            };
          })
        );
        this.totals = {
          subtotal: summary.subtotal,
          saleTax: summary.saleTax,
          total: summary.total
        }
      } catch (error) {
        this.totals = { subtotal: 0, saleTax: 0, total: 0 }
      }
      this.isUpdatingTotals = false;
    }
  }

  updateAvailableProducts(products: QuoteProduct[]) : QuoteProduct[] {
    let result = products;

    if ( this.tabFilter === 'available' ) {
      result = result.filter(item => !item.inPurchaseOrder);
    } else if ( this.tabFilter === 'in-order' ) {
      result = result.filter(item => item.inPurchaseOrder);
    }

    if( this.textFilter.length > 0 ) {
      result = result.filter( item => {
        const result = item.cas.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.catalog.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.brandName?.toLowerCase().includes(this.textFilter.toLowerCase()) ||
          item.description.toLowerCase().includes(this.textFilter.toLowerCase());

        return result;
      });
    }
    return result;
  }


  onAddedToOrderEmitter(quoteItemId: string) {
    if (this.selectedAddressId && !this.selectedProducts.find(p => p.item.idQuotationItem === quoteItemId)) {
      const item = this.selectedQuote?.listQuotationItem.find(i => i.idQuotationItem === quoteItemId);

      if (item && this.selectedQuote) {
        this.selectedProducts.push({
          quoteFolio: this.selectedQuote?.quotationDetails.folio,
          item: item,
          quantity: item?.quantity,
          applyFleteExpress: item?.appliesExpressFreight
        });
        this.updateProducts();
      }
    }
  }

  onRemovedFromOrderEmitter(quoteItemId: string) {
    if (this.selectedAddressId && this.selectedProducts.find(p => p.item.idQuotationItem === quoteItemId)) {
      this.selectedProducts = this.selectedProducts.filter( p => p.item.idQuotationItem !== quoteItemId);
      this.updateProducts();
    }
  }

  onUpdateQuantityEmitter(event: { quoteItemId: string, quantity: number }) {
    const productToEdit = this.selectedProducts.find(p => p.item.idQuotationItem == event.quoteItemId);
    if (this.selectedAddressId && productToEdit) {
      productToEdit.quantity = event.quantity;
      this.updateProducts();
    }
  }

  onUpdateExpressFreightEmitter(event: { quoteItemId: string, expressFreight: boolean }) {
    const productToEdit = this.selectedProducts.find(p => p.item.idQuotationItem == event.quoteItemId);
    if (this.selectedAddressId && productToEdit) {
      productToEdit.applyFleteExpress = event.expressFreight;
      this.updateProducts();
    }
  }

  onFileUploaded(orderFile: OrderFile) {
    this.fileId = orderFile.idFile;
    this.updateTotals();
  }

  onFileRemoved() {
    this.fileId = '';
  }

  onOrderNumberChange() {
    if(this.totals.total === 0) {
      this.updateTotals();
    }
  }


  async createOrder() {

    if( !this.isCreatingOrder &&
          this.customerId &&
          this.contactId &&
          this.fileId &&
          this.selectedProducts.length > 0
        ) {

      this.isCreatingOrder = true;
      try {
        const order: PurchaseOrder = await this.purchaseOrderService.create(
              this.customerId,
              this.contactId,
              this.purchaseOrderNumber.trim(),
              this.fileId,
              this.selectedProducts.map(p => {
                return {
                  IdQuotationItem: p.item.idQuotationItem,
                  quantity: p.quantity,
                  applyFleteExpress: p.applyFleteExpress
                };
              }));

        this.purchaseOrderService.updateSelection(null);

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
