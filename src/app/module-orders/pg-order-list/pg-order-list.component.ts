import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuoteItem } from 'app/model/quote';
import { QuotesService } from 'app/services/quotes.service';
import { AuthService } from 'app/module-auth/auth.service';
import { PurchaseOrderService } from 'app/services/purchase-order.service';
import { OrderService } from 'app/services/order.service';
import { User } from 'app/model/user';
import { OrderTab } from 'app/model/order-tabs';
import { environment } from 'environments/environment';
import { MetaService } from 'app/services/meta.service';

@Component({
  selector: 'pg-order-list',
  templateUrl: './pg-order-list.component.html',
  styleUrls: ['./pg-order-list.component.scss'],
})
export class PgOrderListComponent implements OnInit, OnDestroy {

  private PAGE_SIZE = 12;
  tabs: OrderTab[] = [];
  currentTab: OrderTab = this.tabs[0];
  isFilterClosed = false;
  orders: QuoteItem[] | null = null;
  searchFilter = '';
  isLoadingOrders = false;
  skeletonList = Array(4).fill(0);
  currentPage = 1;
  allLoaded = false;

  /**
  * Store references
  */
  isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  constructor(
    private quoteService: QuotesService,
    private purchaseOrderService: PurchaseOrderService,
    private orderService: OrderService,
    public authService: AuthService,
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

  async ngOnInit() {
    await this.authService.loadSession();

    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loadOrders();
      } else {
        this.router.navigate(['/']);
      }
    });
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }


  getTotalPages(totalResults: number) {
    const totalPages = Math.ceil(totalResults / this.PAGE_SIZE)
    return totalPages;
  }

  updateTab(tabKey: string) {
    if (this.currentTab.key === tabKey) return;
    const currentTab = this.tabs.find(t => t.key == tabKey);
    if (currentTab) {
      this.currentTab = currentTab;
      this.resetListOrders();
    }
  }

  async updateCloseFilter(isFilterClosed: boolean) {
    this.isFilterClosed = isFilterClosed;
    await this.loadOrders(true);
  }

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

  private resetListOrders() {
    this.currentPage = 1;
    this.isFilterClosed = false;
    this.searchFilter = '';
    this.allLoaded = false;
    this.loadOrders(true);
  }
  updateSearch() {
    this.currentPage = 1;
    this.allLoaded = false;
    this.loadOrders(true);
  }

  onScroll() {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.scrollHeight;

    if (position + threshold >= height && this.currentTab.key !== 'confirmed') {
      this.loadOrders();
    }
  }

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
