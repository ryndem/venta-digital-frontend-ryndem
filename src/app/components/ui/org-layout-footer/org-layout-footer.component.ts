import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'app/services/categories.service';
import { Category } from 'app/model/category';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { CartService } from 'app/services/cart.service';
import { updateCategories } from 'app/store/products/product.actions';

@Component({
  selector: 'org-layout-footer',
  templateUrl: './org-layout-footer.component.html',
  styleUrls: ['./org-layout-footer.component.scss'],
})
export class LayoutFooterComponent implements OnInit {

  categories: Category[] = [];
  isAuthenticated = false;

  constructor(
      private categoriesService: CategoriesService,
      private cartService: CartService,
      public authService: AuthService, 
      private store: Store<any> ) {
    this.store.subscribe(state => {
      this.isAuthenticated = state.user.isLogged;
      this.categories = state.product.categories;
    });
  }
  
  async ngOnInit() {
    await this.loadSession();
    this.loadCategories();
  }

  async loadCategories() {
    const categories = await this.categoriesService.list();
    categories.forEach( category => {
      this.categoriesService.setProperties(category)
    });

    this.categories = categories;
    this.store.dispatch(updateCategories({categories: this.categories}));
  }

  private async loadSession() {
    await this.authService.loadSession();
    this.loadCart();
  }
  private async loadCart() {
    if (this.isAuthenticated) {
      await this.cartService.load();
    }
  }
}
