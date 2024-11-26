import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-mobile-navigation-menu',
  templateUrl: './org-mobile-navigation-menu.component.html',
  styleUrls: ['./org-mobile-navigation-menu.component.scss'],
})
export class OrgMobileNavigationMenuComponent {
  @Input()
  categories: Category[] = [];

  @Output()
  closeMenu = new EventEmitter<void>();

  isLogged = false;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
    });
  }

  onCloseMenu(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    this.authService.logout();
    this.onCloseMenu();
  }

  goToQuotes() {
    this.router.navigate(['quotes']);
    this.onCloseMenu();
  }
}
