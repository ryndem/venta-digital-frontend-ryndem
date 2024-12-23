import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'atm-auth-banner',
  templateUrl: './atm-auth-banner.component.html',
  styleUrls: ['./atm-auth-banner.component.scss']
})
export class AtmAuthBannerComponent {

  /**
  * Store references
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  isLoadingUser$: Observable<boolean> = this.store.select(state => state.user.loading);

  constructor(
    public authService: AuthService,
    private store: Store<{ user: UserState }>
  ) { }

  openMobileMenu(): void {
    this.authService.openLoginModal();
  }
}
