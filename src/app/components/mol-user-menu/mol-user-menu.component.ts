import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { User } from 'app/model/user';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';
import { AuthService } from 'app/module-auth/auth.service';
import { loadCart } from 'app/store/actions/cart.actions';

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
  user$: Observable<User | null> = this.store.select(state => state.user.user);
  
  /**
   * Creates an instance of MolUserMenuComponent.
   * @param {AuthService} authService
   * @param {Store<{ user: UserState }>} store
   * @param {Router} router
   */
  constructor(private authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    super();
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
  logout() {
    this.authService.logout();
    this.store.dispatch(loadCart());
    this.isMenuOpened = false;
  }

}
