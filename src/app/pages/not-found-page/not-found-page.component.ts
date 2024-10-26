import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  categories: Category[] = [];

  constructor(private store: Store<any>) {
    this.store.subscribe(state => {
      this.categories = state.product.categories;
    });
  }

}
