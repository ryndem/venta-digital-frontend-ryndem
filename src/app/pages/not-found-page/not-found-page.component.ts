import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/products/product.reducer';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  categories: Category[] = [];

  constructor(private store: Store<{ product: ProductState }>) {
    this.store.subscribe(state => {
      this.categories = state.product.categories;
    });
  }

}
