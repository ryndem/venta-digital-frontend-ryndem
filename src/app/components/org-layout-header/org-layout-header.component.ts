import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingCart } from 'app/model/shopping-cart';
import { Category } from 'app/model/category';
import { User } from 'app/model/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserState } from 'app/store/states/user.state';
import { ProductState } from 'app/store/states/product.state';
import { ShoppingCartState } from 'app/store/states/cart.state';
import { selectCategories } from 'app/store/selectors/product.selectors';
import { selectCurrentCart } from 'app/store/selectors/cart.selectors';
import { selectCurrentUser, selectIsLoginModalOpened, selectUserIsLoading, selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';

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
  categories$: Observable<Category[]>;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null>;

  /**
  * Store reference (user.loading)
  */
  isLoadingUser$: Observable<boolean>;

  /**
  * Store reference (user.isLogged)
  */
  isAuthenticated$: Observable<boolean>;

  /**
  * Store reference (cart.shoppingCart)
  */
  shoppingCart$: Observable<ShoppingCart | null>;

  /**
   * Boolean to track if user login modal is open
   */
  isLoginModalOpened$: Observable<boolean>;

  /**
   * Creates an instance of OrgLayoutHeaderComponent.
   * @param {Store<{
   *       user: UserState,
   *       product: ProductState,
   *       cart: ShoppingCartState
   *     }>} store
   * @param {Router} router
   */
  constructor(
    private store: Store<{
      user: UserState,
      product: ProductState,
      cart: ShoppingCartState
    }>,
    private router: Router
  ) {
    this.isLoadingUser$ = this.store.select(selectUserIsLoading);
    this.user$ = this.store.select(selectCurrentUser);
    this.isAuthenticated$ = this.store.select(selectUserIsLogged);
    this.categories$ = this.store.select(selectCategories);
    this.shoppingCart$ = this.store.select(selectCurrentCart);
    this.isLoginModalOpened$ = this.store.select(selectIsLoginModalOpened);

    this.isAuthenticated$.subscribe( value => {
      this.isLogged = value;
    })
  }

  /**
   * Open login modal
   */
  openLogin(): void {
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
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
    } else {
      this.router.navigate(['cart/shopping-cart']);
    }
  }

}
