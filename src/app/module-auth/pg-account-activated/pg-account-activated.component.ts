import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pg-account-activated',
  templateUrl: './pg-account-activated.component.html',
  styleUrls: ['./pg-account-activated.component.scss'],
})
export class PgAccountActivatedComponent {
  state = 'loading';

  constructor(
    public authService: AuthService,
    private currentRoute: ActivatedRoute,
  ) {
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['token']) {
        this.processActivation(params['token']);
      }
    });
  }

  async processActivation(token: string) {
    try {
      await this.authService.activateUser(token);
      this.state = 'successfull';
    } catch (error) {
      this.state = 'error';
    }
  }
}
