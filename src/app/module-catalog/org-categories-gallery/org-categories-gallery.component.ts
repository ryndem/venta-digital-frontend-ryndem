import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

/**
 * Component to show category items with images
 * @export
 * @class OrgCategoriesGalleryComponent
 */
@Component({
  selector: 'org-categories-gallery',
  templateUrl: './org-categories-gallery.component.html',
  styleUrls: ['./org-categories-gallery.component.scss'],
})
export class OrgCategoriesGalleryComponent {

  /**
   * Flag to show gallery title and header
   */
  @Input() isOnlyCategories = false;

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);
 
  /**
   * Creates an instance of OrgCategoriesGalleryComponent.
   * @param {Store<{ product: ProductState }>} store
   */
  constructor(private store: Store<{ product: ProductState }>) { }

}
