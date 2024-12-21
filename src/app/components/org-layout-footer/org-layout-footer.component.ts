import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { CartService } from 'app/services/cart.service';
import { loadCategories } from 'app/store/actions/product.actions';
import { UserState } from 'app/store/reducers/user.reducer';
import { ProductState } from 'app/store/reducers/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-layout-footer',
  templateUrl: './org-layout-footer.component.html',
  styleUrls: ['./org-layout-footer.component.scss'],
})
export class OrgLayoutFooterComponent implements OnInit {

  isLogged = false;

  /**
  * Store references
  */
  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);
  isAuthenticated$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private store: Store<{ user: UserState, product: ProductState }>
  ) { 
    this.isAuthenticated$.subscribe(value => {
      this.isLogged = value;
    })
  }

  async ngOnInit() {
    await this.loadSession();
    this.initCategories();
  }
  async initCategories() {
    this.store.dispatch(loadCategories());
  }

  private async loadSession() {
    await this.authService.loadSession();
    this.loadCart();
  }
  private async loadCart() {
    if (this.isLogged) {
      await this.cartService.load();
    }
  }
}
