import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { selectCategories } from 'app/store/selectors/product.selectors';
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
  categories$: Observable<Category[]>;
 
  /**
   * Creates an instance of OrgCategoriesGalleryComponent.
   * @param {Store} store
   */
  constructor(private store: Store) {
    this.categories$ = this.store.select(selectCategories);
   }

}
