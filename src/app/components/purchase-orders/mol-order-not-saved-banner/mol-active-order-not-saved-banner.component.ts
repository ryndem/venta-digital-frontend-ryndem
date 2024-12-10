import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'mol-active-order-not-saved-banner',
  templateUrl: './mol-active-order-not-saved-banner.component.html',
  styleUrls: ['./mol-active-order-not-saved-banner.component.scss']
})
export class MolActiveOrderNotSavedBannerComponent {

  showAlert = false;

  constructor(private store: Store<{ user: UserState }>) {
    this.store.subscribe((state) => {
      this.showAlert = state.user.hasOrderItemsSelected && state.user.isLogged;
    })
  }

}
