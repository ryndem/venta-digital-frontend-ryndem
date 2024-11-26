import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Category } from 'app/model/category';
import { User } from 'app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrls: ['./org-layout-header.component.scss'],
})
export class LayoutHeaderComponent {

  categories: Category[] = [];

  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  isAuthenticated = false;
  user: User | null = null;
  shoppingCart: ShoppingCart | null = null;
  isLoadingUser = true;


  constructor(
    public authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      this.categories = state.product.categories;
      this.user = state.user.user;
      this.isLoadingUser = state.user.loading;
      this.isAuthenticated = state.user.isLogged;
      this.shoppingCart = state.cart.shoppingCart;
    });
  }

  openLogin(): void {
    this.authService.openLoginModal();
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

  goToShoppingCart() {
    if(!this.isAuthenticated) {
      this.openLogin();
    }
    this.router.navigate(['shopping-cart']);
  }

}
