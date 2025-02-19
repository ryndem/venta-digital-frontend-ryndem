import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { Category } from 'app/model/category';
import { Observable } from 'rxjs';
import { selectCategories } from 'app/store/selectors/product.selectors';

/**
 * Header category menu
 * @export
 * @class MolCategoryMenuComponent
 * @extends {AtmClosableComponent}
 */
@Component({
  selector: 'mol-category-menu',
  templateUrl: './mol-category-menu.component.html',
  styleUrls: ['./mol-category-menu.component.scss'],
})
export class MolCategoryMenuComponent extends AtmClosableComponent {

  /**
   * Flag to indicate if the menu is opened or closed
   */
  isMenuOpened = false;

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]>;

  /**
   * Creates an instance of MolCategoryMenuComponent.
   * @param {Store} store
   */
  constructor(private store: Store) {
    super();
    this.categories$ = this.store.select(selectCategories);
  }

  /**
   * Close menu method
   */
  override close(): void {
    this.isMenuOpened = false
  }

  /**
   * Toggle menu
   */
  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

}
