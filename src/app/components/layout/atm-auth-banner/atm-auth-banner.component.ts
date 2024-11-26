import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'atm-auth-banner',
  templateUrl: './atm-auth-banner.component.html',
  styleUrls: ['./atm-auth-banner.component.scss']
})
export class AtmAuthBannerComponent {
  isLogged = false;
  isLoadingUser = true;

  constructor(
    public authService: AuthService,
    private store: Store<{ user: { loading: boolean; isLogged: boolean } }>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
      this.isLoadingUser = state.user.loading;
    });
  }

  openMobileMenu(): void {
    this.authService.openLoginModal();
  }
}
