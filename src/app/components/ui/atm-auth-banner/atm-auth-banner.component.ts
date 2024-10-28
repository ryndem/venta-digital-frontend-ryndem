import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'atm-auth-banner',
  templateUrl: './atm-auth-banner.component.html',
  styleUrl: './atm-auth-banner.component.scss'
})
export class AtmAuthBannerComponent {
  isLogged: boolean = false;

  constructor(
    public authService: AuthService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
    });
  }

  openMobileMenu(): void {
    this.authService.openLoginModal();
  }
}
