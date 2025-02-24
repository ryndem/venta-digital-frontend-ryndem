import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { loadAlternativeProducts, loadComplementaryProducts } from 'app/store/actions/product.actions';
import { selectAlternativeProducts, selectComplementaryProducts } from 'app/store/selectors/product.selectors';
import { Observable } from 'rxjs';

/**
 * Component to show product related products
 * @export
 * @class OrgRelatedProductsComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-related-products',
  templateUrl: './org-related-products.component.html',
  styleUrls: ['./org-related-products.component.scss'],
})
export class OrgRelatedProductsComponent implements OnChanges {

  /**
   * Product id to show related products
   * @type {string}
   */
  @Input() productId!: string;

  /**
   * Flag to show alternative products
   */
  isShowingAlternativeProducts = true;

  /**
   * Flag to show empty state
   */
  isEmptyResult = false;

  /**
   * Skeleton list to show on loading state
   */
  skeletonList = Array(4).fill(0);

  alternativeProducts$: Observable<Product[] | null>;
  complementaryProducts$: Observable<Product[] | null>;

  /**
   * Creates an instance of OrgRelatedProductsComponent.
   * @param {ProductsService} productsService
   */
  constructor(
    private store: Store,
  ) {
    this.alternativeProducts$ = this.store.select(selectAlternativeProducts(this.productId));
    this.complementaryProducts$ = this.store.select(selectComplementaryProducts(this.productId));
  }

  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const productId: SimpleChange = changes['productId'];
    if (productId) {
      this.alternativeProducts$ = this.store.select(selectAlternativeProducts(this.productId));
      this.complementaryProducts$ = this.store.select(selectComplementaryProducts(this.productId));
      this.store.dispatch(loadAlternativeProducts({productId: this.productId}));
      this.store.dispatch(loadComplementaryProducts({productId: this.productId}));
      this.updateProducts(true);
    }
  }

  /**
   * Method to load related products
   * @param {boolean} isAlternative
   */
  async updateProducts(isAlternative: boolean) {
    this.isShowingAlternativeProducts = isAlternative;
  }

}
