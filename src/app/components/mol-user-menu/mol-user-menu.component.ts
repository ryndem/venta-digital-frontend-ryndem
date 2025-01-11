import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';
import { loadCart } from 'app/store/actions/cart.actions';
import { UserState } from 'app/store/states/user.state';
import { selectCurrentUser } from 'app/store/selectors/user.selectors';
import { logout } from 'app/store/actions/user.actions';

/**
 * User drop down header component
 * @export
 * @class MolUserMenuComponent
 * @extends {AtmClosableComponent}
 */
@Component({
  selector: 'mol-user-menu',
  templateUrl: './mol-user-menu.component.html',
  styleUrls: ['./mol-user-menu.component.scss'],
})
export class MolUserMenuComponent extends AtmClosableComponent {

  /**
   * Boolean to track if the menu is opened
   */
  isMenuOpened = false;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null>;
  
  /**
   * Creates an instance of MolUserMenuComponent.
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   */
  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    super();
    this.user$ = this.store.select(selectCurrentUser);
  }

  /**
   * Method overrided to close menu
   */
  override close(): void {
    this.isMenuOpened = false
  }

  /**
   * Method to toggle menu open/close
   */
  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  /**
   * Redirects to user orders
   */
  goToOrders() {
    this.router.navigate(['orders']);
    this.isMenuOpened = false;
  }


  /**
   * Logs out the user from session
   */
  logoutUser() {
    this.store.dispatch(logout());
    this.store.dispatch(loadCart());
    this.isMenuOpened = false;
  }

}
