import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';
import { selectCurrentUser } from 'app/store/selectors/user.selectors';
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
  user$: Observable<User | null>;


  /**
   * Creates an instance of OrgQuoteUserInfoComponent.
   * @param {Store} store
   */
  constructor (private store: Store) { 
    this.user$ = this.store.select(selectCurrentUser);
  }
}
