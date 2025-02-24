import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Store } from '@ngrx/store';
import { loadCategories } from 'app/store/actions/product.actions';
import { Observable } from 'rxjs';
import { loadCart } from 'app/store/actions/cart.actions';
import { loadSession } from 'app/store/actions/user.actions';
import { selectCategories } from 'app/store/selectors/product.selectors';

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
   * Creates an instance of OrgLayoutFooterComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store
  ) { 
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
