import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductResponse } from 'app/model/product-response';
import { SearchParams } from 'app/model/search-params';
import { loadProductPage } from 'app/store/actions/product.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectCategories, selectProductPage } from 'app/store/selectors/product.selectors';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { selectIsProductsPageLoading } from 'app/store/selectors/view.selectors';
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
export class PgProductsComponent {

  /**
   * Page size
   */
  pageSize = 12;

  /**
   * Current product page
   */
  currentPage = 1;

  /**
   * Total results loaded for the filters selected
   */
  totalResults = 0;

  /**
   * Showing results on page
   */
  results = 0;

  /**
   * Page sort direction
   */
  sortDirection = 'ASC';

  /**
   * Skeleton list array
   */
  skeletonList = Array(12).fill(0);

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean | null>;

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]>;

  /**
   * Store reference (product.productPage)
   */
  productPage$: Observable<ProductResponse | null>;

  /**
   * Store reference (view.isProductPageLoading)
   */
  isLoading$: Observable<boolean>;

  /**
   * Boolean to track if the user is logged
  */
  isLogged = false;

  /**
   * Creates an instance of PgProductsComponent.
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   * @param {Store} store
   */
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.categories$ = this.store.select(selectCategories);
    this.productPage$ = this.store.select(selectProductPage);
    this.isLoading$ = this.store.select(selectIsProductsPageLoading);
    this.isLogged$.subscribe(value => {
      if (value !== null) {
        this.isLogged = value;
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
    })
    this.setMetaTags();
  }


  /**
   * Show current pagination details getter
   * @readonly
   * @type {string}
   */
  showCurrentPaginationDetails(page: ProductResponse | null): string {
    if(page) {
      const start = (this.currentPage - 1) * this.pageSize + 1;
      const end = Math.min(this.currentPage * this.pageSize, page.totalResults);
      return `Mostrando del ${start} al ${end} de ${page.totalResults}`;
    }
    return '';
  }



  /**
   * Load product page
   * @param {SearchParams} searchParams
   */
  async loadPage(searchParams: SearchParams) {
    this.store.dispatch(loadProductPage({searchParams}));
  }

  /**
   * Toggle list sort direction
   */
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
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Productos - Proquifa',
      tags: [
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
    }));
  }
}
