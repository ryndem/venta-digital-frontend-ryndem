import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { NavigationItemsGroup } from 'app/components/ui/org-navigation-menu/navigation-items-group';

@Component({
  selector: 'org-mobile-navigation-menu',
  templateUrl: './org-mobile-navigation-menu.component.html',
  styleUrl: './org-mobile-navigation-menu.component.scss',
})
export class OrgMobileNavigationMenuComponent {
  @Input()
  navigationItemsGroups: NavigationItemsGroup[] = [];

  @Output()
  closeMenu = new EventEmitter<void>();

  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
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
}
