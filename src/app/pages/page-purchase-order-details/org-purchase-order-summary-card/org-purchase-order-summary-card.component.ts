import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { User } from 'app/model/user';
import { selectCurrentUser } from 'app/store/selectors/user.selectors';
import { UserState } from 'app/store/states/user.state';
import { Observable } from 'rxjs';

/**
 * Component to show purchase order summmary card
 * @export
 * @class OrgPurchaseOrderSummaryCardComponent
 */
@Component({
  selector: 'org-purchase-order-summary-card',
  templateUrl: './org-purchase-order-summary-card.component.html',
  styleUrls: ['./org-purchase-order-summary-card.component.scss']
})
export class OrgPurchaseOrderSummaryCardComponent {
  

  /**
   * Purchase order to show
   * @type {PurchaseOrder}
   */
  @Input() purchaseOrder!: PurchaseOrder;

  /**
   * Boolean to track customer info section
   */
  isShowingCustomerInfo = true;

  /**
  * Store references
  */
  user$: Observable<User | null>;

  
  /**
   * Creates an instance of OrgPurchaseOrderSummaryCardComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) {
    this.user$ = this.store.select(selectCurrentUser);
  }
  
  /**
   * Method to toggle customer info section
   */
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
