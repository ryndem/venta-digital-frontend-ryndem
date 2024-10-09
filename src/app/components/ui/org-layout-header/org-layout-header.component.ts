import { Component, OnInit } from '@angular/core';
import { NavigationItemsGroup } from '../org-navigation-menu/navigation-items-group';
import { AuthService } from 'app/auth/auth.service';
import { OptionsGroup } from '../org-layout-search/org-layout-search';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrl: './org-layout-header.component.scss'
})
export class LayoutHeaderComponent implements OnInit {


  constructor(public authService: AuthService, private categoriesService: CategoriesService) {}

  catalogNavigationGroups: NavigationItemsGroup[] = [];

  productsGroups: OptionsGroup[] = [];

  isMobileMenuOpen: boolean = false;

  openLogin(): void {
    this.authService.openLoginModal();
  }

  onSearchTermChange(value: string): void {

    setTimeout(() => {

      this.productsGroups = [];

      this.productsGroups.push({
        title: 'Estándares',
        items: [{label: value, value}]
      })

    }, 500);

  }

  private async buildNavigationMenu() {

    const tempCategories = await this.categoriesService.list();
    tempCategories.forEach(category => {
      this.categoriesService.setProperties(category);
    });
    
    let group:number = 0;
    let count:number = 0;
    let categoriesGroup:NavigationItemsGroup[] = [];

    while(tempCategories.length > 0) {

      categoriesGroup[group] ??= {items: []};
      categoriesGroup[group].items.push(tempCategories.pop()!);
      count++;

      if (count % 4 == 0) {
        group += 1;
      }

    }

    this.catalogNavigationGroups = categoriesGroup;
  }

  private async loadSession() {
    let algo = await this.authService.loadSession();
    console.log('INIT SESSION', algo);
  }

  ngOnInit(): void {
    this.buildNavigationMenu();
    this.loadSession();
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

}
