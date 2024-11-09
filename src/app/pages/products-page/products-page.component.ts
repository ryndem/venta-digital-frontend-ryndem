import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  productPage: ProductResponse | null = null;

  totalResults: number = 0;
  sortDirection: string = 'ASC';
  productss: Product[] = [];
  isLoading: boolean = false;
  isLogged: boolean = false;
  categories: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
    });
    this.store.subscribe(state => {
      this.categories = state.product.categories;
    });
  }

  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe(async (params) => {
      const searchParams = {
        page: params['page'] || 1,
        sortDirection: params['sortDirection'] || 'ASC',
        category: params['category'] || null,
        q: params['searchTerm'] || null,
      };
      this.sortDirection = searchParams.sortDirection;
      this.loadPage(searchParams);
    });
  }

  async loadPage(searchParams: any) {
    this.isLoading = true;
    try {
      this.productPage = await this.productsService.listProductsByCategory(searchParams);
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
