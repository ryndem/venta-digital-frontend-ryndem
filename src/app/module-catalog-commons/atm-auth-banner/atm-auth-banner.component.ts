import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
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
  isLogged$: Observable<boolean | null>;

  /**
   * Creates an instance of AtmAuthBannerComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store
  ) {
    this.isLogged$ = this.store.select(selectUserIsLogged);
  }

  /**
   * Method to handle open mobile menu action
   */
  openMobileMenu(): void {
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
  }
}
