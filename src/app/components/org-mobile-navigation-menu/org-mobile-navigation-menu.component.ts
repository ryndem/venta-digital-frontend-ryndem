import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Category } from 'app/model/category';
import { UserState } from 'app/store/reducers/user.reducer';

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
  isLogged$ = this.store.select(state => state.user.isLogged);

  /**
   * Creates an instance of OrgMobileNavigationMenuComponent.
   * @param {AuthService} authService
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   */
  constructor(
    private authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) { }


  /**
   * Close menu event method
   */
  onCloseMenu(): void {
    this.closeMenu.emit();
  }

  /**
   * Logout event method
   */
  logout(): void {
    this.authService.logout();
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
