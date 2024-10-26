import { Component, Input } from '@angular/core';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-navigation-menu',
  templateUrl: './org-navigation-menu.component.html',
  styleUrl: './org-navigation-menu.component.scss',
})
export class NavigationMenuComponent {
  @Input()
  categories: Category[] = [];
  isItemsContainerOpened: boolean = false;

  toggleItemsContainer() {
    this.isItemsContainerOpened = !this.isItemsContainerOpened;
  }
}
