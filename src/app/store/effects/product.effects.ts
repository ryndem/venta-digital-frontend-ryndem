import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { CategoriesService } from 'app/services/categories.service';
import { Category } from 'app/model/category';


@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private categoriesService: CategoriesService) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadCategories),
      mergeMap(() =>
        from(this.categoriesService.list()).pipe(
          map((categories:Category[]) => {
            categories.forEach( category => {
                this.categoriesService.setProperties(category);
            });
            return ProductActions.updateCategories({ categories });
          }),
          catchError((error) => of(ProductActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );
}
