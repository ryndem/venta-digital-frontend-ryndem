import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/reducers/product.reducer';
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
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  /**
   * Creates an instance of PgNotFoundComponent.
   * @param {Store<{ product: ProductState }>} store
   */
  constructor(private store: Store<{ product: ProductState }>) { }
  
}
