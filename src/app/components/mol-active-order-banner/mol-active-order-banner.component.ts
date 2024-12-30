import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show purchase order in progress banner
 * @export
 * @class MolActiveOrderBannerComponent
 */
@Component({
  selector: 'mol-active-order-banner',
  templateUrl: './mol-active-order-banner.component.html',
  styleUrls: ['./mol-active-order-banner.component.scss']
})
export class MolActiveOrderBannerComponent {

  /**
  * Store reference (user.hasOrderItemsSelected)
  */
  hasOrderItemsSelected$: Observable<boolean> = this.store.select(state => state.user.hasOrderItemsSelected);

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Creates an instance of MolActiveOrderBannerComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) { }

}
