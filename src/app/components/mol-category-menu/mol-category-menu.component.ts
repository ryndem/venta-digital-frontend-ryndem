import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'mol-category-menu',
  templateUrl: './mol-category-menu.component.html',
  styleUrls: ['./mol-category-menu.component.scss'],
})
export class MolCategoryMenuComponent extends AtmClosableComponent {

  isMenuOpened = false;

  /**
  * Store references
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  constructor(private store: Store<{ product: ProductState}>) {
    super();
  }

  override close(): void {
    this.isMenuOpened = false
  }

  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

}
