import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/model/category';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'org-categories-bar',
  templateUrl: './org-categories-bar.component.html',
  styleUrl: './org-categories-bar.component.scss',
})
export class OrgCategoriesBarComponent implements OnInit {
  categories: Category[] = [];

  activeCategory: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoriesService.list();
    this.categories.forEach((category) => {
      this.categoriesService.setProperties(category);
    });

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
