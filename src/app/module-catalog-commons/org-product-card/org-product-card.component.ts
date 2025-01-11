import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { ImageUtils } from 'app/utils/image.utils';
import { ProductsService } from 'app/services/products.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectUserIsLoading, selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';

/**
 * Component to display product card
 * @export
 * @class OrgProductCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-product-card',
  templateUrl: './org-product-card.component.html',
  styleUrls: ['./org-product-card.component.scss'],
})
export class OrgProductCardComponent implements OnInit {
  
  /**
   * Product to show in the card
   * @type {Product}
   */
  @Input() product!: Product;

  /**
   * Public product price
   * @type {(number | null)}
   */
  priceWeb : number | null = null;

  /**
   * Direct sale product price
   * @type {(number | null)}
   */
  priceVD : number | null = null;

  /**
   * Product presentation image path
   * @type {(string | null)}
   */
  presentationImgPath: string | null = null;

  /**
   * Product brand image path
   * @type {(string | null)}
   */
  brandImgPath: string | null = null;

  /**
   * Boolean to track if the product has existing stock
   */
  hasExistingStock = false;

  /**
   * Boolean to track if the modal is opened
   */
  isModalOpen = false;

  /**
   * Boolean to track if the view button should be visible
   */
  enablePreviewViewButton = false;

  /**
   * Boolean to track if the card is hovered
   */
  isHovered = false;

  /**
   * Boolean to track if the user is currently logged
   */
  isLogged = false;
  
  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean>;

  /**
   * Store reference (user.loading)
   */
  isUserLoading$: Observable<boolean>;

  /**
   * Creates an instance of OrgProductCardComponent.
   * @param {ImageUtils} imageUtils
   * @param {ProductsService} productsService
   * @param {Store<{ user: { loading: boolean; isLogged: boolean } }>} store
   * @param {Router} router
   */
  constructor(
    private imageUtils: ImageUtils,
    private productsService: ProductsService,
    private store: Store<{ user: { loading: boolean; isLogged: boolean } }>,
    private router: Router
  ) {
    this.isUserLoading$ = this.store.select(selectUserIsLoading)
    this.isLogged$ = this.store.select(selectUserIsLogged)
    this.isLogged$.subscribe(value => {
      if (value != this.isLogged) {
        this.isLogged = value;
        this.loadPriceOffer();
      }
    });
  }

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.enablePreviewViewButton = this.router.url === '/';
    this.presentationImgPath = this.imageUtils.getPresentationImage(this.product);
    this.brandImgPath = this.imageUtils.getBrandImage(this.product);
    this.setHasExistingStock();
    this.loadPriceOffer();
  }

  /**
   * Sets has existing stock to show disclaimer
   */
  private setHasExistingStock() {
    this.hasExistingStock =
      this.product?.hasStock && (this.product?.existingStockQuantity || 0) > 0;
  }

  /**
   * Loads price offer for the current user
   */
  private async loadPriceOffer() {
    if(this.product) {
      this.priceVD = this.product?.offert.unitPrice;
      this.priceWeb = this.product?.offert.unitPriceWeb;

      if(!this.priceWeb && this.isLogged) {
        const product = await this.productsService.getProduct( this.product?.idProduct );
        this.priceVD = product.offert.unitPrice;
        this.priceWeb = product.offert.unitPriceWeb;
      }
    }
  }

  /**
   * Calculates if the product can be purchased
   * @param {Product} product
   * @return {boolean}
   */
  isProductEligible(product: Product): boolean {
    return product.offert?.deliveryTimeDays > 0 &&
      !this.hasExistingStock &&
      product.typeKey !== 'training' &&
      product.typeKey !== 'publications';
  }

  /**
   * Method to open outstanding product preview
   * @param {Event} event
   */
  openPreviewViewModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isModalOpen = true;
  }

  /**
   * Open login modal for non authenticated users
   * @param {Event} event
   */
  openLoginModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
  }

  /**
   * Method for close previre modal event
   */
  closePreviewModal() {
    this.isModalOpen = false;
  }
}
