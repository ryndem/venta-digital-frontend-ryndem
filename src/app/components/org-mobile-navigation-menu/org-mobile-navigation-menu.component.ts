import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { logout } from 'app/store/actions/user.actions';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
import { Observable } from 'rxjs';

/**
 * Navigation menu for mobile resolutions
 * @export
 * @class OrgMobileNavigationMenuComponent
 */
@Component({
  selector: 'org-mobile-navigation-menu',
  templateUrl: './org-mobile-navigation-menu.component.html',
  styleUrls: ['./org-mobile-navigation-menu.component.scss'],
})
export class OrgMobileNavigationMenuComponent {
  
  /**
   * Category list to show on the menu
   * @type {(Category[] | null)}
   */
  @Input() categories: Category[] | null = [];

  /**
   * Close menu event emitter
   */
  @Output() closeMenu = new EventEmitter<void>();

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean>;

  /**
   * Creates an instance of OrgMobileNavigationMenuComponent.
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   */
  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.isLogged$ = this.store.select(selectUserIsLogged);
  }


  /**
   * Close menu event method
   */
  onCloseMenu(): void {
    this.closeMenu.emit();
  }

  /**
   * Logout event method
   */
  logoutUser(): void {
    this.store.dispatch(logout());
    this.onCloseMenu();
  }

  /**
   * Navigation link method
   */
  goToOrders() {
    this.router.navigate(['orders']);
    this.onCloseMenu();
  }
}
