import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show authentication banner
 * @export
 * @class AtmAuthBannerComponent
 */
@Component({
  selector: 'atm-auth-banner',
  templateUrl: './atm-auth-banner.component.html',
  styleUrls: ['./atm-auth-banner.component.scss']
})
export class AtmAuthBannerComponent {

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  
  /**
  * Store reference (user.loading)
  */
  isLoadingUser$: Observable<boolean> = this.store.select(state => state.user.loading);

  /**
   * Creates an instance of AtmAuthBannerComponent.
   * @param {AuthService} authService
   * @param {Store<{ user: UserState }>} store
   */
  constructor(
    public authService: AuthService,
    private store: Store<{ user: UserState }>
  ) { }

  /**
   * Method to handle open mobile menu action
   */
  openMobileMenu(): void {
    this.authService.openLoginModal();
  }
}
