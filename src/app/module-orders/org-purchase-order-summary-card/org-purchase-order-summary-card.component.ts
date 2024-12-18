import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchaseOrder } from 'app/model/purchase-order';
import { User } from 'app/model/user';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-purchase-order-summary-card',
  templateUrl: './org-purchase-order-summary-card.component.html',
  styleUrls: ['./org-purchase-order-summary-card.component.scss']
})
export class OrgPurchaseOrderSummaryCardComponent {
  
  @Input()
  purchaseOrder!: PurchaseOrder;

  isShowingCustomerInfo = true;

  user$: Observable<User | null> = this.store.select(state => state.user.user);

  constructor(private store: Store<{ user: UserState }>) { }
  
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
