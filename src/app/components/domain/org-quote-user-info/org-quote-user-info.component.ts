import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';

@Component({
  selector: 'org-quote-user-info',
  templateUrl: './org-quote-user-info.component.html',
  styleUrl: './org-quote-user-info.component.scss'
})
export class OrgQuoteUserInfoComponent {

  @Input()
  address?: string | null;
  
  user: User | null = null;
  
  constructor (private store: Store<any>) {
    this.store.subscribe((state) => {
      this.user = state.user.user;
    });
  }
}
