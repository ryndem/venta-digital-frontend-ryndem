import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

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
  * Store references
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  /**
   * Creates an instance of MolCategoryMenuComponent.
   * @param {Store<{ product: ProductState}>} store
   */
  constructor(private store: Store<{ product: ProductState}>) {
    super();
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
