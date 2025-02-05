import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuoteItem } from 'app/model/quote';
import { OrderTab } from 'app/model/order-tabs';
import { environment } from 'environments/environment';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectIsLoadingOrders, selectOrderList } from 'app/store/selectors/order.selectors';
import { loadOrders, loadPurchaseOrders, loadQuotes, updateOrderList } from 'app/store/actions/order.actions';

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
   * Search filter model
   */
  searchFilter = '';

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

  // /**
  //  * Boolean to track loading state
  //  */
  // isLoadingOrders = false;

  /**
   * Store reference (user.isLogged)
   */
  isAuthenticated$: Observable<boolean | null>;

  /**
   * Store reference (orders.orderList)
   */
  orderList$: Observable<QuoteItem[] | null>;

  /**
  * Store reference (user.isLogged)
  */ 
  isLoadingOrders$: Observable<boolean>;

  /**
   * Creates an instance of PgOrderListComponent.
   * @param {Store} store
   * @param {Router} router
   */
  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.isAuthenticated$ = this.store.select(selectUserIsLogged);
    this.orderList$ = this.store.select(selectOrderList);
    this.isLoadingOrders$ = this.store.select(selectIsLoadingOrders);

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
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated == true) {
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

    if(tabChanged) {
      this.store.dispatch(updateOrderList({ orderList: []}))
    }

    if (this.currentTab.key === 'quotes') {
      this.store.dispatch(loadQuotes({ searchFilter: this.searchFilter, pageSize: this.PAGE_SIZE, page: this.currentPage}))
    }

    if (this.currentTab.key === 'in-progress') {
      this.store.dispatch(loadPurchaseOrders({ searchFilter: this.searchFilter, pageSize: this.PAGE_SIZE, page: this.currentPage}))
    }

    if (this.currentTab.key === 'confirmed') {
      this.store.dispatch(loadOrders({ searchFilter: this.searchFilter, isClosed: this.isFilterClosed}));
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
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Órdenes - Proquifa', 
      tags: [
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
    }));
  }
}
