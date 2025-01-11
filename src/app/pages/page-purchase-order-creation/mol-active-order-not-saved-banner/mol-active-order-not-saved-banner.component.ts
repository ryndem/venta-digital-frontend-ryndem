import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserHasOrderItemsSelected, selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
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
  hasOrderItemsSelected$: Observable<boolean>;

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean>;

  /**
   * Creates an instance of MolActiveOrderNotSavedBannerComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) {
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.hasOrderItemsSelected$ = this.store.select(selectUserHasOrderItemsSelected);
  }

}
