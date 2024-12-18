import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmedOrder } from 'app/model/confirmed-order';
import { User } from 'app/model/user';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-order-summary-card',
  templateUrl: './org-order-summary-card.component.html',
  styleUrls: ['./org-order-summary-card.component.scss']
})
export class OrgOrderSummaryCardComponent {
  
  @Input()
  order!: ConfirmedOrder;

  isShowingCustomerInfo = true;

  user$: Observable<User | null> = this.store.select(state => state.user.user);

  constructor(private store: Store<{ user: UserState }>) { 
  }
  
  showHideCustomerInfo() {
    this.isShowingCustomerInfo = !this.isShowingCustomerInfo
  }
}
