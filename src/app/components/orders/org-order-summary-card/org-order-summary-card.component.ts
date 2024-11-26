import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';

@Component({
  selector: 'org-order-summary-card',
  templateUrl: './org-order-summary-card.component.html',
  styleUrls: ['./org-order-summary-card.component.scss']
})
export class OrgOrderSummaryCardComponent {
  @Input()
  purchaseOrder!: any;

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
