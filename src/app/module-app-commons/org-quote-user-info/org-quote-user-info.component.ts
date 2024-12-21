import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-quote-user-info',
  templateUrl: './org-quote-user-info.component.html',
  styleUrls: ['./org-quote-user-info.component.scss']
})
export class OrgQuoteUserInfoComponent {

  @Input()
  address?: string | null;

  /**
  * Store references
  */
  user$: Observable<User | null> = this.store.select(state => state.user.user);

  constructor (private store: Store<{ user: UserState }>) { }
  
}
