import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';
import { ProductState } from 'app/store/products/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './pg-not-found.component.html',
  styleUrls: ['./pg-not-found.component.scss'],
})
export class PgNotFoundComponent {

  categories$: Observable<Category[]> = this.store.select(state => state.product.categories);

  constructor(private store: Store<{ product: ProductState }>) { }
  
}
