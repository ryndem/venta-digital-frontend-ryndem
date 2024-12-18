import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/products/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-categories-bar',
  templateUrl: './org-categories-bar.component.html',
  styleUrls: ['./org-categories-bar.component.scss'],
})
export class OrgCategoriesBarComponent implements OnInit {
  
  activeCategory = '';

  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ product: ProductState }>,
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.activeCategory = params['category'] ?? '';
    });
  }

  setCategoryParam(category: string) {
    this.activeCategory = category;

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: { category, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
