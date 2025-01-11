import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

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
  state = 'loading';

  /**
   * Creates an instance of PgAccountActivatedComponent.
   * @param {AuthService} authService
   * @param {ActivatedRoute} currentRoute
   */
  constructor(
    private authService: AuthService,
    private currentRoute: ActivatedRoute,
  ) {
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['token']) {
        this.processActivation(params['token']);
      }
    });
  }

  /**
   * Method to handle account activation action
   * @param {string} token
   */
  async processActivation(token: string) {
    try {
      await this.authService.activateUser(token);
      this.state = 'successfull';
    } catch (error) {
      this.state = 'error';
    }
  }
  
}
