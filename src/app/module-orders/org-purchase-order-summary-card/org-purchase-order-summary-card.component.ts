import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { User } from 'app/model/user';
import { UserState } from 'app/store/reducers/user.reducer';
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
   *
   * @memberof OrgPurchaseOrderSummaryCardComponent
   */
  isShowingCustomerInfo = true;

  /**
  * Store references
  */
  user$: Observable<User | null> = this.store.select(state => state.user.user);

  
  /**
   * Creates an instance of OrgPurchaseOrderSummaryCardComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor(private store: Store<{ user: UserState }>) { }
  
  /**
   * Method to toggle customer info section
   */
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
