import { Component, OnInit } from '@angular/core';
import { NavigationItemsGroup } from '../org-navigation-menu/navigation-items-group';
import { AuthService } from 'app/auth/auth.service';
import { OptionsGroup } from '../org-layout-search/org-layout-search';
import { CategoriesService } from 'app/services/categories.service';
import { Store } from '@ngrx/store';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrl: './org-layout-header.component.scss',
})
export class LayoutHeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.userName = state.user.fullName;
      this.isAuthenticated = state.user.isLogged;
    });
  }

  catalogNavigationGroups: NavigationItemsGroup[] = [];

  productsGroups: OptionsGroup[] = [];

  isMobileMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  isAuthenticated: boolean = false;
  userName: string | null = null;

  openLogin(): void {
    this.authService.openLoginModal();
  }

  async onSearchTermChange(value: string): Promise<void> {
    let result = await this.productsService.searchProducts(value);
    let items = result.map((r) => {
      return { label: r.description, value: r.idProducto };
    });
    this.productsGroups = [];

    this.productsGroups.push({
      title: 'Resultados',
      items: items,
    });
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

  private async loadSession() {
    await this.authService.loadSession();
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

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isUserMenuOpen = false;
  }
}
