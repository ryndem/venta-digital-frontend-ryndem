import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-categories-gallery',
  templateUrl: './org-categories-gallery.component.html',
  styleUrl: './org-categories-gallery.component.scss',
})
export class OrgCategoriesGalleryComponent {
  
  constructor(private store: Store<any>) {
    this.store.subscribe( state => {
      this.categories = state.product.categories;
    })
  }

  categories: Category[] = [];

  @Input()
  isOnlyCategories: boolean = false;


}
