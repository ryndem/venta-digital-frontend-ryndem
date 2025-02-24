import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { activateUser } from 'app/store/actions/user.actions';
import { updateActivationState } from 'app/store/actions/view.actions';
import { selectActivationState } from 'app/store/selectors/user.selectors';
import { Observable } from 'rxjs';

/**
 * Page component to display account activation confirmation
 * @export
 * @class PgAccountActivatedComponent
 */
@Component({
  selector: 'pg-account-activated',
  templateUrl: './pg-account-activated.component.html',
  styleUrls: ['./pg-account-activated.component.scss'],
})
export class PgAccountActivatedComponent {

  /**
   * Component state
   */
  state$: Observable<string>;

  token: string | null = null;

  /**
   * Creates an instance of PgAccountActivatedComponent.
   * @param {ActivatedRoute} currentRoute
   * @param {Store} store
   */
  constructor(
    private currentRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.state$ = this.store.select(selectActivationState);
    this.store.dispatch(updateActivationState({ activationState: 'loading'}));
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['token'] && !this.token) {
        this.token = params['token']
        this.processActivation();
      }
    });
  }

  /**
   * Method to handle account activation action
   * @param {string} token
   */
  async processActivation() {
    if (this.token) {
      this.store.dispatch(activateUser({token: this.token}));
    }
  }
  
}
