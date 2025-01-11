import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';
import { selectUserIsLoading, selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
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
  isLogged$: Observable<boolean>;
  
  /**
  * Store reference (user.loading)
  */
  isLoadingUser$: Observable<boolean>;

  /**
   * Creates an instance of AtmAuthBannerComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(
    private store: Store<{ user: UserState }>
  ) {
    this.isLoadingUser$ = this.store.select(selectUserIsLoading);
    this.isLogged$ = this.store.select(selectUserIsLogged);
  }

  /**
   * Method to handle open mobile menu action
   */
  openMobileMenu(): void {
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
  }
}
