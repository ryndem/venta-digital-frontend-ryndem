import { Component } from '@angular/core';
import { AuthService } from 'app/module-auth/auth.service';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Category } from 'app/model/category';
import { User } from 'app/model/user';
import { Router } from '@angular/router';
import { UserState } from 'app/store/reducers/user.reducer';
import { ProductState } from 'app/store/reducers/product.reducer';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrls: ['./org-layout-header.component.scss'],
})
export class OrgLayoutHeaderComponent {

  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  isLogged = false;
  
  /**
  * Store references
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);
  user$: Observable<User | null> = this.store.select(state => state.user.user);
  isLoadingUser$: Observable<boolean> = this.store.select(state => state.user.loading);
  isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);


  constructor(
    public authService: AuthService,
    private store: Store<{
      user: UserState,
      product: ProductState,
      cart: ShoppingCartState
    }>,
    private router: Router
  ) { 
    this.isAuthenticated$.subscribe( value => {
      this.isLogged = value;
    })
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
    if(!this.isLogged) {
      this.openLogin();
    }
    this.router.navigate(['cart/shopping-cart']);
  }

}
