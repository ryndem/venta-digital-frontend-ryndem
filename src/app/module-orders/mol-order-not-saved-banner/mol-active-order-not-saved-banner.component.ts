import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

/**
 * Purchase order in progress not saved banner
 * @export
 * @class MolActiveOrderNotSavedBannerComponent
 */
@Component({
  selector: 'mol-active-order-not-saved-banner',
  templateUrl: './mol-active-order-not-saved-banner.component.html',
  styleUrls: ['./mol-active-order-not-saved-banner.component.scss']
})
export class MolActiveOrderNotSavedBannerComponent {

  /**
  * Store reference (user.hasOrderItemsSelected)
  */
  hasOrderItemsSelected$: Observable<boolean> = this.store.select(state => state.user.hasOrderItemsSelected);

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Creates an instance of MolActiveOrderNotSavedBannerComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) { }

}
