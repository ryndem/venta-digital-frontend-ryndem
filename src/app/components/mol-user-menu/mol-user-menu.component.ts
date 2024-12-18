import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';
import { AuthService } from 'app/module-auth/auth.service';

@Component({
  selector: 'mol-user-menu',
  templateUrl: './mol-user-menu.component.html',
  styleUrls: ['./mol-user-menu.component.scss'],
})
export class MolUserMenuComponent extends AtmClosableComponent {

  isMenuOpened = false;

  user$: Observable<User | null> = this.store.select(state => state.user.user);
  
  constructor(private authService: AuthService,
    private cartService: CartService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    super();
  }

  override close(): void {
    this.isMenuOpened = false
  }

  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  goToOrders() {
    this.router.navigate(['orders']);
    this.isMenuOpened = false;
  }
  logout() {
    this.authService.logout();
    this.cartService.load();
    this.isMenuOpened = false;

  }

}
