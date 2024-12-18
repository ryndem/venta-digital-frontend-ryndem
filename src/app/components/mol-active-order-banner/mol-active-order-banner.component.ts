import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'mol-active-order-banner',
  templateUrl: './mol-active-order-banner.component.html',
  styleUrls: ['./mol-active-order-banner.component.scss']
})
export class MolActiveOrderBannerComponent {

  hasOrderItemsSelected$: Observable<boolean> = this.store.select(state => state.user.hasOrderItemsSelected);
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  constructor(private store: Store<{ user: UserState }>) { }

}
