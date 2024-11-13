import { Component, Input } from '@angular/core';
import { ClosableComponent } from 'app/components/commons/closable.component';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-navigation-menu',
  templateUrl: './org-navigation-menu.component.html',
  styleUrls: ['./org-navigation-menu.component.scss'],
})
export class NavigationMenuComponent extends ClosableComponent {
  
  @Input()
  categories: Category[] = [];
  isItemsContainerOpened = false;

  close() {
    this.isItemsContainerOpened = false;
  }

  toggleItemsContainer() {
    this.isItemsContainerOpened = !this.isItemsContainerOpened;
  }
}
