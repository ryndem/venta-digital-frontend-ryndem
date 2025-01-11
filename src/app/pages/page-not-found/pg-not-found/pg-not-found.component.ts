import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { selectCategories } from 'app/store/selectors/product.selectors';
import { ProductState } from 'app/store/states/product.state';
import { Observable } from 'rxjs';

/**
 * Page component to display not found disclaimer
 * @export
 * @class PgNotFoundComponent
 */
@Component({
  selector: 'app-not-found-page',
  templateUrl: './pg-not-found.component.html',
  styleUrls: ['./pg-not-found.component.scss'],
})
export class PgNotFoundComponent {

  /**
  * Store references
  */
  categories$: Observable<Category[]>;

  /**
   * Creates an instance of PgNotFoundComponent.
   * @param {Store<{ product: ProductState }>} store
   */
  constructor(private store: Store<{ product: ProductState }>) {
    this.categories$ = this.store.select(selectCategories);
  }
  
}
