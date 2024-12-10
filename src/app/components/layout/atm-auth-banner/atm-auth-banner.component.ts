import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { UserState } from 'app/store/users/user.reducer';

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
    private store: Store<{ user: UserState }>
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
