import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { User } from 'app/model/user';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'org-order-summary-card',
  templateUrl: './org-order-summary-card.component.html',
  styleUrls: ['./org-order-summary-card.component.scss']
})
export class OrgOrderSummaryCardComponent {
  @Input()
  purchaseOrder!: PurchaseOrder;

  isShowingCustomerInfo = true;
  user: User | null = null;

  constructor(private store: Store<{ user: UserState }>) {
    this.store.subscribe(state => {
      this.user = state.user.user;
    })
  }

  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
