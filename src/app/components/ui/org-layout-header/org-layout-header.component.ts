import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { OptionsGroup } from '../org-layout-search/org-layout-search';
import { Store } from '@ngrx/store';
import { ProductsService } from 'app/services/products.service';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Category } from 'app/model/category';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrl: './org-layout-header.component.scss',
})
export class LayoutHeaderComponent {
  
  categories: Category[] = [];

  productsGroups: OptionsGroup[] = [];
  isMobileMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  isAuthenticated: boolean = false;
  user: User | null = null;
  shoppingCart: ShoppingCart | null = null;


  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private productsService: ProductsService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.categories = state.product.categories;
      this.user = state.user.user;
      this.isAuthenticated = state.user.isLogged;
      this.shoppingCart = state.cart.shoppingCart;
    });
  }

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

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

}
