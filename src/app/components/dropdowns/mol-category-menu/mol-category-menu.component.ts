import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AtmClosableComponent } from 'app/components/commons/atm-closable/atm-closable.component';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/products/product.reducer';

@Component({
  selector: 'mol-category-menu',
  templateUrl: './mol-category-menu.component.html',
  styleUrls: ['./mol-category-menu.component.scss'],
})
export class MolCategoryMenuComponent extends AtmClosableComponent {

  categories: Category[] = [];
  isMenuOpened = false;

  constructor(private store: Store<{ product: ProductState}>) {
    super();
    this.store.subscribe( state => {
      this.categories = state.product.categories;
    })
  }

  override close(): void {
    this.isMenuOpened = false
  }

  toggleShowMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

}
