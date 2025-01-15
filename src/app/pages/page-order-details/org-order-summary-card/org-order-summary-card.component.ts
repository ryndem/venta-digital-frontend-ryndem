import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { User } from 'app/model/user';
import { selectCurrentUser } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
import { Observable } from 'rxjs';

/**
 * Order summary card
 * @export
 * @class OrgOrderSummaryCardComponent
 */
@Component({
  selector: 'org-order-summary-card',
  templateUrl: './org-order-summary-card.component.html',
  styleUrls: ['./org-order-summary-card.component.scss']
})
export class OrgOrderSummaryCardComponent {
  
  /**
   * Confirmed order to show summay
   * @type {ConfirmedOrder}
   */
  @Input() order!: ConfirmedOrder | null;

  /**
   * Boolean to track customer info section
   */
  isShowingCustomerInfo = true;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null>;


  /**
   * Creates an instance of OrgOrderSummaryCardComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) {
    this.user$ = this.store.select(selectCurrentUser);
  }
  
  /**
   * Toggle customer info section
   */
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
