import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-categories-bar',
  templateUrl: './org-categories-bar.component.html',
  styleUrl: './org-categories-bar.component.scss',
})
export class OrgCategoriesBarComponent implements OnInit {
  categories: Category[] = [];
  activeCategory: string = '';

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute, 
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.categories = state.product.categories;
    });
  }

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
