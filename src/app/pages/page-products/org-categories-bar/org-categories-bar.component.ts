import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { selectCategories } from 'app/store/selectors/product.selectors';
import { ProductState } from 'app/store/states/product.state';
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
  categories$: Observable<Category[]>;

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
  ) {
    this.categories$ = this.store.select(selectCategories);
  }

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
