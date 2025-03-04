import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { CategoriesService } from 'app/services/categories.service';
import { Category } from 'app/model/category';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/model/product';
import { ProductResponse } from 'app/model/product-response';
import { SearchedProduct } from 'app/model-props/searched-product';
import { OptionsGroup } from 'app/model-props/options-group';
import { updateIsProductSearchActive } from '../actions/view.actions';
import { Store } from '@ngrx/store';

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
   * @param {Store} store
   */
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private store: Store
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
   * Effect to load featured products
  */

  loadFeaturedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadFeaturedProducts),
      mergeMap(() =>
        this.productsService.listFeaturedProducts().pipe(
          map((response) => ProductActions.loadFeaturedProductsSuccess({
            featuredProducts: response.results
          })),
          catchError((error) => of(
            ProductActions.loadFeaturedProductsFailure({ error: error.message }))
          )
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
      mergeMap(action =>
        from(this.productsService.getProduct(action.productId)).pipe(
          map((product: Product) => {
            this.store.dispatch(
              ProductActions.addLoadedProduct({ product: product })
            );
            return ProductActions.updateProductPrice({ product: product });
          }),
          catchError(() => of({ type: '[Order]loadProductPriceFailure' }))
        )
      )
    )
  );

  /**
   * Effect to load complementary products by product id
   */
    searchProducts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.searchProducts),
        mergeMap((action) =>
          from(this.productsService.searchProducts(action.searchTerm)).pipe(
            map((results: SearchedProduct[]) => {
              const items = results.map((r) => {
                return { label: r.description, value: r.idProducto };
              });
              const optionsGroups: OptionsGroup[] = [];
              optionsGroups.push({
                title: 'Resultados',
                items: items,
              });

              updateIsProductSearchActive({ isProductSearchActive: false})
              return ProductActions.updateSearchResults({searchResults: optionsGroups});
            }),
            catchError(() => of({type: '[Order]searchProductsFailure'}))
          )
        )
      )
    );

}
