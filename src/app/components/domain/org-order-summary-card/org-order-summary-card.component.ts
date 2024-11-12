import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'app/model/order';
import { User } from 'app/model/user';

@Component({
  selector: 'org-order-summary-card',
  templateUrl: './org-order-summary-card.component.html',
  styleUrls: ['./org-order-summary-card.component.scss']
})
export class OrgOrderSummaryCardComponent {
  @Input()
  order!: Order;

  isShowingCustomerInfo = true;
  user: User | null = null;

  constructor(private store: Store<any>) {
    this.store.subscribe(state => {
      this.user = state.user.user;
    })
  }

  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
