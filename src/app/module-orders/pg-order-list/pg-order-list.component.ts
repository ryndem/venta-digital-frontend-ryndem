import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuoteItem } from 'app/model/quote';
import { QuotesService } from 'app/services/quotes.service';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { OrderService } from 'app/services/order.service';
import { User } from 'app/model/user';
import { OrderTab } from 'app/model/order-tabs';
import { environment } from 'environments/environment';
import { MetaService } from 'app/services/meta.service';
import { loadSession } from 'app/store/actions/user.actions';

/**
 * Page component to show orders list
 * @export
 * @class PgOrderListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'pg-order-list',
  templateUrl: './pg-order-list.component.html',
  styleUrls: ['./pg-order-list.component.scss'],
})
export class PgOrderListComponent implements OnInit, OnDestroy {

  /**
   * Orders page size
   * @private
   */
  private PAGE_SIZE = 12;

  /**
   * Order type tabs
   * @type {OrderTab[]}
   */
  tabs: OrderTab[] = [];

  /**
   * Current selected tab
   * @type {OrderTab}
   */
  currentTab: OrderTab = this.tabs[0];

  /**
   * Is closed confirmed order filter selection
   */
  isFilterClosed = false;

  /**
   * Order list
   * @type {(QuoteItem[] | null)}
   */
  orders: QuoteItem[] | null = null;

  /**
   * Search filter model
   */
  searchFilter = '';

  /**
   * Boolean to track loading state
   */
  isLoadingOrders = false;
  
  /**
   * Skeleton collection
   */
  skeletonList = Array(4).fill(0);

  /**
   * Current collection page
   */
  currentPage = 1;

  /**
   * Boolean to track end of collection reach
   */
  allLoaded = false;

  /**
  * Store reference (user.isLogged)
  */
  isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Creates an instance of PgOrderListComponent.
   * @param {QuotesService} quoteService
   * @param {PurchaseOrderService} purchaseOrderService
   * @param {OrderService} orderService
   * @param {Store<{ user: { isLogged: boolean, user: User } }>} store
   * @param {Router} router
   * @param {MetaService} metaService
   */
  constructor(
    private quoteService: QuotesService,
    private purchaseOrderService: PurchaseOrderService,
    private orderService: OrderService,
    private store: Store<{ user: { isLogged: boolean, user: User } }>,
    private router: Router,
    private metaService: MetaService
  ) {

    this.tabs = [
      {
        key: 'quotes',
        title: 'Cotizaciones',
        emptyMessage: 'No tienes cotizaciones vigentes.'
      },
      {
        key: 'in-progress',
        title: 'Pedidos en Proceso',
        emptyMessage: 'No tienes órdenes de compra.'
      },
      {
        key: 'confirmed',
        title: 'Pedidos Confirmados',
        emptyMessage: 'No tienes pedidos.'
      },
    ]
    this.currentTab = this.tabs[0];
  }

  /**
   * Initializing method
   */
  async ngOnInit() {
    this.store.dispatch(loadSession());

    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loadOrders();
      } else {
        this.router.navigate(['/']);
      }
    });
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  /**
   * Removes on scroll event listener
   */
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }


  /**
   * Calculates max page number
   * @param {number} totalResults
   * @return {number} 
   */
  getTotalPages(totalResults: number) {
    const totalPages = Math.ceil(totalResults / this.PAGE_SIZE)
    return totalPages;
  }

  /**
   * Manage order type tab event
   * @param {string} tabKey
   * @return {*} 
   */
  updateTab(tabKey: string) {
    if (this.currentTab.key === tabKey) return;
    const currentTab = this.tabs.find(t => t.key == tabKey);
    if (currentTab) {
      this.currentTab = currentTab;
      this.resetListOrders();
    }
  }

  /**
   * Manage update 'Closed' filter
   * @param {boolean} isFilterClosed
   */
  async updateCloseFilter(isFilterClosed: boolean) {
    this.isFilterClosed = isFilterClosed;
    await this.loadOrders(true);
  }

  /**
   * Load order page
   * @param {boolean} [tabChanged=false]
   */
  async loadOrders(tabChanged = false) {
    if (this.allLoaded || this.isLoadingOrders) return;

    this.isLoadingOrders = true;

    if(tabChanged) {
      this.orders = [];
    }

    try {
      if (this.currentTab.key === 'quotes') {
        const page = await this.quoteService.getQuotes(
          this.searchFilter,
          this.PAGE_SIZE,
          this.currentPage,
        );
        if (this.currentPage > this.getTotalPages(page.totalResults)) {
          this.allLoaded = true;
        } else {
          const quotes: QuoteItem[] = page.results.map(quote => {
            return {
              id: quote.idQuotation,
              folio: quote.folio,
              registrationDate: quote.registrationDate,
              items: quote.items,
              total: quote.total,
              expirationDate: quote.expirationDate,
              isValid: quote.isValid
            }
          })
          this.orders = this.orders ? [...this.orders, ...quotes] : quotes;
          this.currentPage++;
          this.allLoaded = this.currentPage > this.getTotalPages(page.totalResults);
        }
      }

      if (this.currentTab.key === 'in-progress') {
        const page = await this.purchaseOrderService.getPurchaseOrders(
          this.searchFilter,
          this.PAGE_SIZE,
          this.currentPage,
        );
        if (this.currentPage > this.getTotalPages(page.totalResults)) {
          this.allLoaded = true;
        } else {
          const purchaseOrders: QuoteItem[] = page.results.map(purchaseOrder => {
            return {
              id: purchaseOrder.idPurchaseOrder,
              folio: purchaseOrder.folio,
              registrationDate: purchaseOrder.registrationDate,
              items: purchaseOrder.items,
              total: purchaseOrder.total,
            }
          })
          this.orders = this.orders ? [...this.orders, ...purchaseOrders] : purchaseOrders;
          this.currentPage++;
          this.allLoaded = this.currentPage > this.getTotalPages(page.totalResults);
        }
      }

      if (this.currentTab.key === 'confirmed') {
        const page = await this.orderService.getOrders(this.searchFilter, this.isFilterClosed);
        const confirmedOrders: QuoteItem[] = page.results.map(confirmedOrder => {
          return {
            id: confirmedOrder.idOrder,
            folio: confirmedOrder.internalOrderNumber,
            registrationDate: confirmedOrder.registrationDate,
            items: confirmedOrder.totalItems,
            total: confirmedOrder.totalAmount,
          }
        })
        this.orders = confirmedOrders;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoadingOrders = false;
    }
  }

  /**
   * Restart order list 
   */
  private resetListOrders() {
    this.currentPage = 1;
    this.isFilterClosed = false;
    this.searchFilter = '';
    this.allLoaded = false;
    this.loadOrders(true);
  }

  
  /**
   * Search on orders and reset pagination
   */
  updateSearch() {
    this.currentPage = 1;
    this.allLoaded = false;
    this.loadOrders(true);
  }

  /**
   * Manage scroll event
   */
  onScroll() {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.scrollHeight;

    if (position + threshold >= height && this.currentTab.key !== 'confirmed') {
      this.loadOrders();
    }
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Órdenes - Proquifa',
      [
        {
          name: 'description',
          content: 'Consulta tus cotizaciones, pedidos en proceso y pedidos confirmados en un solo lugar. Administra tus pedidos y tramita nuevos pedidos fácilmente en Proquifa.',
        },
        {
          name: 'keywords',
          content: 'cotizaciones, pedidos en proceso, pedidos confirmados, tramitar pedido, administración de pedidos, Proquifa',
        },
        {
          property: 'og:title',
          content: 'Cotizaciones - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Gestiona tus cotizaciones, pedidos en proceso y pedidos confirmados. Tramita un nuevo pedido desde Proquifa.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/orders`,
        },
        {
          name: 'twitter:title',
          content: 'Cotizaciones - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Consulta tus cotizaciones y pedidos, administra tu historial y tramita nuevos pedidos de manera sencilla en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/orders`,
        },
      ]
    );
  }
}
