import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';
import { UserState } from 'app/store/reducers/user.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show user info component
 * @export
 * @class OrgQuoteUserInfoComponent
 */
@Component({
  selector: 'org-quote-user-info',
  templateUrl: './org-quote-user-info.component.html',
  styleUrls: ['./org-quote-user-info.component.scss']
})
export class OrgQuoteUserInfoComponent {


  /**
   * Address to show on quote user info
   * @type {(string | null)}
   */
  @Input() address?: string | null;

  /**
  * Store reference (user.user)
  */
  user$: Observable<User | null> = this.store.select(state => state.user.user);


  /**
   * Creates an instance of OrgQuoteUserInfoComponent.
   * @param {Store<{ user: UserState }>} store
   */
  constructor (private store: Store<{ user: UserState }>) { }
}
