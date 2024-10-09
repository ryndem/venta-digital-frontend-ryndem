import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationItemsGroup } from 'app/components/ui/org-navigation-menu/navigation-items-group';

@Component({
  selector: 'org-mobile-navigation-menu',
  templateUrl: './org-mobile-navigation-menu.component.html',
  styleUrl: './org-mobile-navigation-menu.component.scss'
})
export class OrgMobileNavigationMenuComponent {

  @Input()
  navigationItemsGroups: NavigationItemsGroup[] = [];

  @Output()
  closeMenu = new EventEmitter<void>();

  onCloseMenu(): void {
    this.closeMenu.emit();
  }

}
