import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { SearchParams } from 'app/model/search-params';
import { ProductsService } from 'app/services/products.service';
import { ProductState } from 'app/store/products/product.reducer';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  productPage: ProductResponse | null = null;

  pageSize = 12;
  currentPage = 1;
  totalResults = 0;
  results = 0;
  sortDirection = 'ASC';
  productss: Product[] = [];
  isLoading = false;
  isLogged = false;
  categories: Category[] = [];
  skeletonList = Array(12).fill(0)

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ user: UserState, product: ProductState }>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
    });
    this.store.subscribe(state => {
      this.categories = state.product.categories;
    });
  }

  get showCurrentPaginationDetails(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalResults);
    return `Mostrando del ${start} al ${end} de ${this.totalResults}`;
  }

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
}
