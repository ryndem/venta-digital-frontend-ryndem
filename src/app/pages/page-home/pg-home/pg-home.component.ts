import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { loadOutstandingProducts } from 'app/store/actions/product.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectOutstandingProducts } from 'app/store/selectors/product.selectors';
import { selectIsOutstandingProductsLoading } from 'app/store/selectors/view.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to display home
 * @export
 * @class PgHomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './pg-home.component.html',
  styleUrls: ['./pg-home.component.scss'],
})
export class PgHomeComponent implements OnInit {

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
   * Creates an instance of PgHomeComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store
  ) {
    this.outstandingProducts$ = this.store.select(selectOutstandingProducts);
    this.isLoadingProducts$ = this.store.select(selectIsOutstandingProductsLoading);
    this.setMetaTags();
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.store.dispatch(loadOutstandingProducts())
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
