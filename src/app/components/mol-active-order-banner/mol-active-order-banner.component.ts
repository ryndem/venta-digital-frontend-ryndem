import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserHasOrderItemsSelected, selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
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
  hasOrderItemsSelected$: Observable<boolean>;

  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean>;

  /**
 * Check if the current path is in Purchase Order Creation Page
 */
  isInProgressOrderCreation: boolean;

  /**
   * Creates an instance of MolActiveOrderBannerComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router,
  ) {
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.hasOrderItemsSelected$ = this.store.select(selectUserHasOrderItemsSelected);
    this.isInProgressOrderCreation = this.router.url === '/orders/in-progress/creation';
  }

}
