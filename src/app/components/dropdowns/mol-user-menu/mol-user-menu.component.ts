import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { AtmClosableComponent } from 'app/components/commons/atm-closable/atm-closable.component';
import { User } from 'app/model/user';
import { CartService } from 'app/services/cart.service';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'mol-user-menu',
  templateUrl: './mol-user-menu.component.html',
  styleUrls: ['./mol-user-menu.component.scss'],
})
export class MolUserMenuComponent extends AtmClosableComponent {

  isMenuOpened = false;
  user: User | null = null;

  constructor(private authService: AuthService,
    private cartService: CartService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    super();
    this.store.subscribe( state => {
      this.user = state.user.user;
    })
  }

  override close(): void {
    this.isMenuOpened = false
  }

  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  goToQuotes() {
    this.router.navigate(['quotes']);
    this.isMenuOpened = false;
  }
  logout() {
    this.authService.logout();
    this.cartService.load();
    this.isMenuOpened = false;

  }

}
