import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/products/product.reducer';

@Component({
  selector: 'org-categories-gallery',
  templateUrl: './org-categories-gallery.component.html',
  styleUrls: ['./org-categories-gallery.component.scss'],
})
export class OrgCategoriesGalleryComponent {

  constructor(private store: Store<{ product: ProductState }>) {
    this.store.subscribe(state => {
      this.categories = state.product.categories;
    })
  }

  categories: Category[] = [];

  @Input()
  isOnlyCategories = false;


}
