import { Component, OnInit } from '@angular/core';
import { NavigationItemsGroup } from '../org-navigation-menu/navigation-items-group';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'org-layout-footer',
  templateUrl: './org-layout-footer.component.html',
  styleUrl: './org-layout-footer.component.scss',
})
export class LayoutFooterComponent implements OnInit {
  catalogNavigationGroups: NavigationItemsGroup[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.buildNavigationMenu();
  }

  private async buildNavigationMenu() {
    const tempCategories = await this.categoriesService.list();
    tempCategories.forEach((category) => {
      this.categoriesService.setProperties(category);
    });

    let group: number = 0;
    let count: number = 0;
    let categoriesGroup: NavigationItemsGroup[] = [];

    tempCategories.forEach((category) => {
      categoriesGroup[group] ??= { items: [] };
      categoriesGroup[group].items.push(category!);
      count++;

      if (count % 4 == 0) {
        group += 1;
      }
    });

    this.catalogNavigationGroups = categoriesGroup;
  }
}
