import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { User } from 'app/model/user';
import { UserState } from 'app/store/reducers/user.reducer';
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
  @Input() order!: ConfirmedOrder;

  /**
   * Boolean to track customer info section
   */
  isShowingCustomerInfo = true;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null> = this.store.select(state => state.user.user);


  /**
   * Creates an instance of OrgOrderSummaryCardComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) {}
  
  /**
   * Toggle customer info section
   */
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
