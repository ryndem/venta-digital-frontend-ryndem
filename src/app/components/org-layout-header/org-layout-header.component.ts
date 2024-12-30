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

/**
 * Component to show header layout
 * @export
 * @class OrgLayoutHeaderComponent
 */
@Component({
  selector: 'org-layout-header',
  templateUrl: './org-layout-header.component.html',
  styleUrls: ['./org-layout-header.component.scss'],
})
export class OrgLayoutHeaderComponent {

  /**
   * Boolean to track if the mobile menu is open
   */
  isMobileMenuOpen = false;

  /**
   * Boolean to track if the user menu is open
   */
  isUserMenuOpen = false;


  /**
   * Boolean to track if the user is logged
   */
  isLogged = false;
  
  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);
  
  /**
  * Store reference (user.user)
  */user$: Observable<User | null> = this.store.select(state => state.user.user);
  
  /**
  * Store reference (user.loading)
  */isLoadingUser$: Observable<boolean> = this.store.select(state => state.user.loading);
  
  /**
  * Store reference (user.isLogged)
  */isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  
  /**
  * Store reference (cart.shoppingCart)
  */shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);


  /**
   * Creates an instance of OrgLayoutHeaderComponent.
   * @param {AuthService} authService
   * @param {Store<{
   *       user: UserState,
   *       product: ProductState,
   *       cart: ShoppingCartState
   *     }>} store
   * @param {Router} router
   */
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

  /**
   * Open login modal
   */
  openLogin(): void {
    this.authService.openLoginModal();
  }

  /**
   * Open mobile menu
   */
  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  /**
   * Hides mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /**
   * Toggles user menu
   */
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  /**
   * Refirects to shopping cart page
   */
  goToShoppingCart() {
    if(!this.isLogged) {
      this.openLogin();
    }
    this.router.navigate(['cart/shopping-cart']);
  }

}
