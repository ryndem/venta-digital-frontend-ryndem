import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mol-active-order-banner',
  templateUrl: './mol-active-order-banner.component.html',
  styleUrls: ['./mol-active-order-banner.component.scss']
})
export class MolActiveOrderBannerComponent {

  showAlert = false;

  constructor(private store: Store<any>) {
    this.store.subscribe((state) => {
      this.showAlert = state.user.hasOrderItemsSelected && state.user.isLogged;
    })
  }

}
