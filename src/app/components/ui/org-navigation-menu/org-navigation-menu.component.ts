import { Component, Input } from '@angular/core';
import { NavigationItemsGroup } from './navigation-items-group';

@Component({
  selector: 'org-navigation-menu',
  templateUrl: './org-navigation-menu.component.html',
  styleUrl: './org-navigation-menu.component.scss'
})
export class NavigationMenuComponent {

  @Input()
  navigationItemsGroups: NavigationItemsGroup[] = [];

  isItemsContainerOpened: boolean = false;

  toggleItemsContainer() {
    this.isItemsContainerOpened = !this.isItemsContainerOpened;
  }

}
