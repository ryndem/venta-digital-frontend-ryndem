import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show categories tab bar
 * @export
 * @class OrgCategoriesBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-categories-bar',
  templateUrl: './org-categories-bar.component.html',
  styleUrls: ['./org-categories-bar.component.scss'],
})
export class OrgCategoriesBarComponent implements OnInit {
  
  /**
   * Category selected
   */
  activeCategory = '';

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  /**
   * Creates an instance of OrgCategoriesBarComponent.
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   * @param {Store<{ product: ProductState }>} store
   */
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ product: ProductState }>,
  ) { }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((params) => {
      this.activeCategory = params['category'] ?? '';
    });
  }

  /**
   * Method to update category selected
   * @param {string} category
   */
  setCategoryParam(category: string) {
    this.activeCategory = category;

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: { category, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
