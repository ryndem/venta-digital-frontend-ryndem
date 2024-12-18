import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Category } from 'app/model/category';
import { UserState } from 'app/store/users/user.reducer';

@Component({
  selector: 'org-mobile-navigation-menu',
  templateUrl: './org-mobile-navigation-menu.component.html',
  styleUrls: ['./org-mobile-navigation-menu.component.scss'],
})
export class OrgMobileNavigationMenuComponent {
  @Input()
  categories: Category[] | null = [];

  @Output()
  closeMenu = new EventEmitter<void>();

  isLogged$ = this.store.select(state => state.user.isLogged);

  constructor(
    private authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) { }

  onCloseMenu(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    this.authService.logout();
    this.onCloseMenu();
  }

  goToOrders() {
    this.router.navigate(['orders']);
    this.onCloseMenu();
  }
}
