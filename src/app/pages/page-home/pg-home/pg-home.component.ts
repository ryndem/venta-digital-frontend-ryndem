import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { loadFeaturedProducts } from 'app/store/actions/product.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectFeaturedProducts, selectIsLoadingFeaturedProducts } from 'app/store/selectors/product.selectors';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display home
 * @export
 * @class PgHomeComponent
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './pg-home.component.html',
  styleUrls: ['./pg-home.component.scss'],
})
export class PgHomeComponent {

  /**
   * Skeleton collection
   */
  skeletonList = Array(4).fill(0);

  /**
   * Store reference (view.isOutstandingProductsLoading)
   */
  isLoadingProducts$: Observable<boolean>;

  /**
  * Store reference (product.outstandingProducts)
  */
  outstandingProducts$: Observable<Product[] | null>;

  /**
    * Store reference (user.isLogged)
    */
  isLogged$: Observable<boolean | null>;

  /**
   * Boolean to track if the user is logged
  */
  isLogged = false;

  /**
   * Creates an instance of PgHomeComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store
  ) {
    this.outstandingProducts$ = this.store.select(selectFeaturedProducts);
    this.isLoadingProducts$ = this.store.select(selectIsLoadingFeaturedProducts);
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.setMetaTags();
    this.isLogged$.subscribe(value => {
      if (value !== null) {
        this.isLogged = value;
        this.store.dispatch(loadFeaturedProducts());
      }
    })
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Dynamic Page - Proquifa',
      tags: [
        {
          property: 'og:url',
          content: environment.baseUrl,
        },
        {
          property: 'twitter:url',
          content: environment.baseUrl,
        },
      ]
    }));
  }
}
