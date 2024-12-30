import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { SearchParams } from 'app/model/search-params';
import { MetaService } from 'app/services/meta.service';
import { ProductsService } from 'app/services/products.service';
import { ProductState } from 'app/store/reducers/product.reducer';
import { UserState } from 'app/store/reducers/user.reducer';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display product result list
 * @export
 * @class PgProductsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pg-products',
  templateUrl: './pg-products.component.html',
  styleUrls: ['./pg-products.component.scss'],
})
export class PgProductsComponent implements OnInit {
  productPage: ProductResponse | null = null;

  pageSize = 12;
  currentPage = 1;
  totalResults = 0;
  results = 0;
  sortDirection = 'ASC';
  productss: Product[] = [];
  isLoading = false;
  skeletonList = Array(12).fill(0);

  /**
  * Store references
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  categories$: Observable<Category[]> = this.store.select(state=> state.product.categories);

  
  /**
   * Creates an instance of PgProductsComponent.
   * @param {ProductsService} productsService
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   * @param {Store<{ user: UserState, product: ProductState }>} store
   * @param {MetaService} metaService
   */
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ user: UserState, product: ProductState }>,
    private metaService: MetaService
  ) {
    this.setMetaTags();
  }


  get showCurrentPaginationDetails(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalResults);
    return `Mostrando del ${start} al ${end} de ${this.totalResults}`;
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe(async (params) => {
      const searchParams: SearchParams = {
        pageSize: this.pageSize,
        page: params['page'] || 1,
        sortDirection: params['sortDirection'] || 'ASC',
        category: params['category'],
        q: params['searchTerm'],
      };
      this.currentPage = searchParams.page;
      this.sortDirection = searchParams.sortDirection;
      this.loadPage(searchParams);
    });
  }

  async loadPage(searchParams: SearchParams) {
    this.isLoading = true;
    try {
      const productsPage = await this.productsService.listProductsByCategory(searchParams);
      this.productPage = productsPage;
      this.totalResults = productsPage.totalResults;
      this.results = productsPage.results.length;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection == 'ASC' ? 'DESC' : 'ASC';

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: {
        sortDirection: this.sortDirection,
      },
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Productos - Proquifa',
      [
        {
          name: 'description',
          content: 'Explora nuestro listado completo de productos. Filtra por categorías y encuentra lo que necesitas en Proquifa.',
        },
        {
          name: 'keywords',
          content: 'productos, categorías, catálogo, Proquifa, productos, publicaciones, marcas, reactivo, controlado, capacitaciones, labware, publicaciones, microbiología',
        },
        {
          property: 'og:title',
          content: 'Productos - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Descubre nuestro listado de productos. Filtra por categorías y encuentra lo que buscas.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/products`,
        },
        {
          name: 'twitter:title',
          content: 'Productos - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Explora nuestro catálogo completo de productos. Filtra y encuentra lo que necesitas.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/products`,
        },
      ]
    );
  }
}
