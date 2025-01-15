import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Store } from '@ngrx/store';
import { loadCategories } from 'app/store/actions/product.actions';
import { Observable } from 'rxjs';
import { loadCart } from 'app/store/actions/cart.actions';
import { loadSession } from 'app/store/actions/user.actions';
import { ProductState } from 'app/store/states/product.state';
import { UserState } from 'app/store/states/user.state';
import { selectCategories } from 'app/store/selectors/product.selectors';
import { selectUserIsLoading } from 'app/store/selectors/user.selectors';

/**
 * App footer component
 * @export
 * @class OrgLayoutFooterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-layout-footer',
  templateUrl: './org-layout-footer.component.html',
  styleUrls: ['./org-layout-footer.component.scss'],
})
export class OrgLayoutFooterComponent implements OnInit {

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]>;

  /**
  * Store reference (user.isLogged)
  */
  isAuthenticated$: Observable<boolean>;

  /**
   * Creates an instance of OrgLayoutFooterComponent.
   * @param {Store<{ user: UserState, product: ProductState }>} store
   */
  constructor(
    private store: Store<{ user: UserState, product: ProductState }>
  ) { 
    this.isAuthenticated$ = this.store.select(selectUserIsLoading);
    this.categories$ = this.store.select(selectCategories);
  }
  
  /**
   * Initializing method
   */
  async ngOnInit() {
    await this.loadSessionAndCart();
    this.initCategories();
  }

  /**
   * Method to load product categories
   */
  async initCategories() {
    this.store.dispatch(loadCategories());
  }

  /**
   * Method to load user session and shopping cart
   * @private
   */
  private async loadSessionAndCart() {
    this.store.dispatch(loadSession());
    this.store.dispatch(loadCart());
  }
}
