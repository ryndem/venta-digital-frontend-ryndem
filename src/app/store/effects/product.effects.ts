import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { CategoriesService } from 'app/services/categories.service';
import { Category } from 'app/model/category';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';


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

  /**
   * Effect to load alternative products by product id
   */
  loadAlternativeProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadAlternativeProducts),
      mergeMap((action) =>
        from(this.productsService.listAlternativeProducts(action.productId)).pipe(
          map((productResponse: ProductResponse) => ProductActions.updateAlternativeProducts({productId: action.productId, products: productResponse.results})),
          catchError(() => of({type: '[Order]loadAlternativeProductsFailure'}))
        )
      )
    )
  );

  /**
   * Effect to load complementary products by product id
   */
  listComplementaryProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadComplementaryProducts),
      mergeMap((action) =>
        from(this.productsService.listComplementaryProducts(action.productId)).pipe(
          map((productResponse: ProductResponse) => ProductActions.updateComplementaryProducts({productId: action.productId, products: productResponse.results})),
          catchError(() => of({type: '[Order]listComplementaryProductsFailure'}))
        )
      )
    )
  );

  /**
   * Effect to load complementary products by product id
   */
  loadProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductPrice),
      mergeMap((action) =>
        from(this.productsService.getProduct(action.productId)).pipe(
          map((product: Product) => ProductActions.updateProductPrice({product: product})),
          catchError(() => of({type: '[Order]loadProductPriceFailure'}))
        )
      )
    )
  );
  
}
