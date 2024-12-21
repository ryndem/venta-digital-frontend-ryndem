import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-categories-gallery',
  templateUrl: './org-categories-gallery.component.html',
  styleUrls: ['./org-categories-gallery.component.scss'],
})
export class OrgCategoriesGalleryComponent {

  /**
  * Store references
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);
 
  @Input()
  isOnlyCategories = false;

  constructor(private store: Store<{ product: ProductState }>) { }

}
