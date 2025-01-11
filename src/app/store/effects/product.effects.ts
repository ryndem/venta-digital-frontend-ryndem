import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { CategoriesService } from 'app/services/categories.service';
import { Category } from 'app/model/category';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/model/product';


/**
 * Product effects to update product state
 * @export
 * @class ProductEffects
 */
@Injectable()
export class ProductEffects {


  /**
   * Creates an instance of ProductEffects.
   * @param {Actions} actions$
   * @param {CategoriesService} categoriesService
   * @param {ProductsService} productsService
   */
  constructor(
    private actions$: Actions, 
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  /**
   * Effect to load product categories
   */
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
          catchError(() => of({ type: '[Product]loadCategoriesFailure' }))
        )
      )
    )
  );

  /**
   * Effect to load product categories
   */
  loadOutstandingProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadOutstandingProducts),
      take(1),
      mergeMap(() =>
        from(this.productsService.listOutstandingProducts()).pipe(
          mergeMap(() => of({type: '[Product]loadOutstandingProducts'})),
          catchError(() => of({ type: '[Product]loadOutstandingProductsFailure' }))
        )
      )
    )
  );

  /**
   * Effect to load product categories
   */
  loadProductPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductPage),
      mergeMap((action) =>
        from(this.productsService.listProductsByCategory(action.searchParams)).pipe(
          mergeMap(() => of({type: '[Product]loadProductPage'})),
          catchError(() => of({ type: '[Product]loadProductPageFailure' }))
        )
      )
    )
  );

  /**
   * Effect to load product by id
   */
  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductById),
      mergeMap((action) =>
        from(this.productsService.getProduct(action.productId)).pipe(
          map((product: Product) => ProductActions.addLoadedProduct({product: product})),
          catchError(() => of({type: '[Order]loadProductByIdFailure'}))
        )
      )
    )
  );
  
}
