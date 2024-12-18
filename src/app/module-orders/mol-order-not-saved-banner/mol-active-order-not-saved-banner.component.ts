import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'app/store/users/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'mol-active-order-not-saved-banner',
  templateUrl: './mol-active-order-not-saved-banner.component.html',
  styleUrls: ['./mol-active-order-not-saved-banner.component.scss']
})
export class MolActiveOrderNotSavedBannerComponent {

  hasOrderItemsSelected$: Observable<boolean> = this.store.select(state => state.user.hasOrderItemsSelected);
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  constructor(private store: Store<{ user: UserState }>) { }

}
