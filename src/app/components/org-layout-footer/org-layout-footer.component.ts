import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Store } from '@ngrx/store';
import { loadCategories } from 'app/store/actions/product.actions';
import { UserState } from 'app/store/reducers/user.reducer';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';
import { loadCart } from 'app/store/actions/cart.actions';
import { loadSession } from 'app/store/actions/user.actions';

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
   * Boolean to track if the user is authenticated
   */
  isLogged = false;

  /**
  * Store reference (product.categories)
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  /**
  * Store reference (user.isLogged)
  */
  isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Creates an instance of OrgLayoutFooterComponent.
   * @param {Store<{ user: UserState, product: ProductState }>} store
   */
  constructor(
    private store: Store<{ user: UserState, product: ProductState }>
  ) { 
    this.isAuthenticated$.subscribe(value => {
      this.isLogged = value;
    })
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
