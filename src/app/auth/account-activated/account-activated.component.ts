import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'account-activated',
  templateUrl: './account-activated.component.html',
  styleUrls: ['./account-activated.component.scss'],
})
export class AccountActivatedComponent {
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
