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
import { PurchaseOrder } from 'app/model/purchase-order';
import { OrderItem, PurchaseOrderForm } from 'app/model/purchase-order-form';
import { Observable } from 'rxjs';
import { User } from 'app/model/user';
import { environment } from 'environments/environment';
import { UserState } from 'app/store/states/user.state';
import { selectCurrentUser, selectUserHasOrderItemsSelected } from 'app/store/selectors/user.selectors';
import { showErrorNotification } from 'app/store/actions/view.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Page component to create purchase order
 * @export
 * @class PgPurchaseOrderCreationComponent
 */
@Component({
  selector: 'pg-purchase-order-creation',
  templateUrl: './pg-purchase-order-creation.component.html',
  styleUrls: ['./pg-purchase-order-creation.component.scss'],
})
export class PgPurchaseOrderCreationComponent {

  /**
   * Purchase order quote page size
   * @private
   */
  private PAGE_SIZE = 6;

  /**
   * Purchase order quotes
   * @type {Quote[]}
   */
  quotes: Quote[] = [];
  
  /**
   * Purchase order available products
   * @type {QuoteProduct[]}
   */
  availableProducts: QuoteProduct[] = [];

  /**
   * Selected address id
   * @type {(string | null)}
   */
  selectedAddressId: string | null = null;

  /**
   * Selected quote
   * @type {(ShoppingCart | null)}
   */
  selectedQuote: ShoppingCart | null = null;


  /**
   * Purchase order selected products
   * @type {OrderItem[]}
   */
  selectedProducts: OrderItem[] = [];

  /**
   * Purchase order form
   * @type {PurchaseOrderForm}
   */
  purchaseOrderForm: PurchaseOrderForm = {
    addressId: '',
    purchaseOrderNumber: '',
    idFile: '',
    orderItems: []
  };

  /**
   * Boolean to track if quotes are loading
   */
  isQuotesLoading = false;

  /**
   * Boolean to track if totals are updating
   */
  isUpdatingTotals = false;

  /**
   * Boolean to track if items are loading
   */
  isItemsLoading = false;

  /**
   * Boolean to track if the order is creating
   */
  isCreatingOrder = false;

  /**
   * Boolean to track if a purchase order is saved and loaded
   */
  isSavedLoad = false;

  /**
   * Tab selected
   */
  tabFilter = 'available';

  /**
   * Text filter
   */
  textFilter = '';

  /**
   * Purchase order totals
   * @type {{ subtotal: number; saleTax: number; total: number }}
   */
  totals: { subtotal: number; saleTax: number; total: number } = {
    subtotal: 0,
    saleTax: 0,
    total: 0
  };

  /**
   * File id
   */
  fileId = '';

  /**
   * Purchase order number
   */
  purchaseOrderNumber = '';

  /**
   * Current quote page
   */
  currentPage = 1;

  /**
   * Total quote pages
   */
  totalPages = 0;

  /**
   * User's customer id
   * @type {(string | null)}
   */
  customerId: string | null = null;

  /**
   * User's contact id
   * @type {(string | null)}
   */
  contactId: string | null = null;

  /**
   * Store reference (user.user)
   */
  user$: Observable<User | null>;

  /**
   * Store reference (user.hasOrderItemsSelected)
   */
  hasOrderItemsSelected$: Observable<boolean>;

  /**
   * Creates an instance of PgPurchaseOrderCreationComponent.
   * @param {QuotesService} quotesService
   * @param {PurchaseOrderService} purchaseOrderService
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   */
  constructor(
    private quotesService: QuotesService,
    private purchaseOrderService: PurchaseOrderService,
    private store: Store<{ user: UserState }>,
    private router: Router,
  ) {
    this.user$ = this.store.select(selectCurrentUser);
    this.hasOrderItemsSelected$ = this.store.select(selectUserHasOrderItemsSelected);
    
    this.user$.subscribe(value => {
      if(value) {
        this.customerId = value.idCustomer;
        this.contactId = value.idContactCustomer
      }
    })

    this.hasOrderItemsSelected$.subscribe(value => {
      if(value && this.selectedProducts.length === 0) {
        this.initSavedState();
      }
    })

    this.setMetaTags();
  }

  /**
   * Loads purchase order in progress
   */
  async initSavedState() {
    const orderForm = this.purchaseOrderService.getOrderForm();

    if( orderForm ) {
      this.isSavedLoad = true;
      await this.setAddressSelected( orderForm.addressId );
      this.selectedProducts = orderForm.orderItems;
      this.fileId = orderForm.idFile;
      this.purchaseOrderNumber = orderForm.purchaseOrderNumber;
    }
  }

  /**
   * Lintens when the addres is updates
   * @param {(Address | null)} address
   * @return {*} 
   */
  async onAddressSelected(address: Address | null) {
    if(!address) return;
    this.selectedProducts = [];
    await this.setAddressSelected(address.idAddress);
  }

  /**
   * Method to update addres selected
   * @param {string} addressId
   */
  async setAddressSelected(addressId: string) {
    this.isQuotesLoading = true;
    this.selectedAddressId = addressId;

    this.selectedQuote = null;
    this.availableProducts = [];

    const quotePage = await this.quotesService.getQuotesByAddressId(addressId, this.PAGE_SIZE);
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

  /**
   * Method to handle quote page change
   * @param {number} newPage
   * @return {*} 
   */
  async quotesPageChange(newPage: number) {
    if(!this.selectedAddressId) return;

    this.isQuotesLoading = true;
    const quotePage = await this.quotesService.getQuotesByAddressId(
      this.selectedAddressId,
      this.PAGE_SIZE,
      newPage,
    );
    this.currentPage = newPage;
    this.totalPages = Math.ceil(quotePage.totalResults / this.PAGE_SIZE);
    this.quotes = quotePage.results;
    this.isQuotesLoading = false;
  }

  /**
   * Method to handle select quote action
   * @param {Quote} quote
   */
  async selectQuote(quote: Quote) {
    this.isItemsLoading = true;
    this.availableProducts = [];
    this.selectedQuote = await this.quotesService.getById(quote.idQuotation);
    this.updateProducts();
    this.isItemsLoading = false;
  }


  /**
   * Update tab to filter quote products
   * @param {string} tab
   */
  updateTab(tab:string) {
    this.tabFilter = tab;
    this.updateProducts();
  }

   /**
    * Method to update products loaded
    */
   updateProducts() {
    if(this.selectedAddressId) {
      this.availableProducts =  this.selectedQuote? this.updateAvailableProducts(this.selectedQuote?.listQuotationItem) : [];
      this.availableProducts = this.availableProducts.filter(p => this.selectedProducts.findIndex(pi => pi.item.idQuotationItem == p.idQuotationItem)<0);

      this.purchaseOrderForm.purchaseOrderNumber = this.purchaseOrderNumber.trim();
      this.purchaseOrderForm.orderItems = this.selectedProducts;
      this.purchaseOrderForm.addressId = this.selectedAddressId;
      this.purchaseOrderForm.idFile = this.fileId;

      if( this.isSavedLoad ) {
        this.isSavedLoad = false;
      } else {
        this.purchaseOrderService.updateSelection(this.purchaseOrderForm);
      }


      this.updateTotals();
    }
  }

  /**
   * Method to update order totals 
   */
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

  /**
   * Method to update product list to show on available products section
   * @param {QuoteProduct[]} products
   * @return {QuoteProduct[]}
   */
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


  /**
   * Method to handle add product to order action
   * @param {string} quoteItemId
   */
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

  /**
   * Method to handle product remove action
   * @param {string} quoteItemId
   */
  onRemovedFromOrderEmitter(quoteItemId: string) {
    if (this.selectedAddressId && this.selectedProducts.find(p => p.item.idQuotationItem === quoteItemId)) {
      this.selectedProducts = this.selectedProducts.filter( p => p.item.idQuotationItem !== quoteItemId);
      this.updateProducts();
    }
  }

  /**
   * Method to handle product quantity update action
   * @param {{ quoteItemId: string, quantity: number }} event
   */
  onUpdateQuantityEmitter(event: { quoteItemId: string, quantity: number }) {
    const productToEdit = this.selectedProducts.find(p => p.item.idQuotationItem == event.quoteItemId);
    if (this.selectedAddressId && productToEdit) {
      productToEdit.quantity = event.quantity;
      this.updateProducts();
    }
  }

  /**
   * Method to handle express freight update action
   * @param {{ quoteItemId: string, expressFreight: boolean }} event
   */
  onUpdateExpressFreightEmitter(event: { quoteItemId: string, expressFreight: boolean }) {
    const productToEdit = this.selectedProducts.find(p => p.item.idQuotationItem == event.quoteItemId);
    if (this.selectedAddressId && productToEdit) {
      productToEdit.applyFleteExpress = event.expressFreight;
      this.updateProducts();
    }
  }

  /**
   * Listener of the order file uploaded
   * @param {OrderFile} orderFile
   */
  onFileUploaded(orderFile: OrderFile) {
    this.fileId = orderFile.idFile;
    this.updateTotals();
  }


  /**
   * Listener for the attached file removal
   */
  onFileRemoved() {
    this.fileId = '';
  }

  /**
   * Listener of the order number input change
   */
  onOrderNumberChange() {
    if(this.totals.total === 0) {
      this.updateTotals();
    }
  }


  /**
   * Method to handle order creation action
   */
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

        this.router.navigate(['orders/in-progress/created'], {
          queryParams: {
            purchaseOrderId: order.idPurchaseOrder
          }
        });
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse) {
          this.store.dispatch(showErrorNotification({ message: error.error.detail}));
        } else {
          this.store.dispatch(showErrorNotification({ message: 'Error al crear orden'}));
        }
        this.isCreatingOrder = false
      }

    }

  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
        pageTitle: 'Creación de Pedido - Proquifa', 
        tags: [
          {
            name: 'description',
            content: 'Crea un nuevo pedido seleccionando la dirección de entrega y las partidas de cotizaciones que deseas incluir. Gestiona tus pedidos de manera eficiente en Proquifa.',
          },
          {
            name: 'keywords',
            content: 'creación de pedido, agregar cotizaciones, nuevo pedido, orders, tramitar pedido, Proquifa',
          },
          {
            property: 'og:title',
            content: 'Creación de Pedido - Proquifa',
          },
          {
            property: 'og:description',
            content: 'Crea un nuevo pedido seleccionando tu dirección de entrega y agregando las cotizaciones necesarias. Simplifica la gestión de pedidos con Proquifa.',
          },
          {
            property: 'og:url',
            content: `${environment.baseUrl}/purchase-orders/creation`,
          },
          {
            name: 'twitter:title',
            content: 'Creación de Pedido - Proquifa',
          },
          {
            name: 'twitter:description',
            content: 'Selecciona tu dirección y cotizaciones para crear un pedido de manera rápida y eficiente en Proquifa.',
          },
          {
            property: 'twitter:url',
            content: `${environment.baseUrl}/purchase-orders/creation`,
          },
        ]}
      ));
  }

}
