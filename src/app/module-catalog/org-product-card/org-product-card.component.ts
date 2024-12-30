import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/module-auth/auth.service';
import { Product } from 'app/model/product';
import { ImageService } from 'app/services/image.service';
import { ProductsService } from 'app/services/products.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
   * 
   * @type {(number | null)}
   */
  priceWeb : number | null = null;

  /**
   * 
   * @type {(number | null)}
   */
  priceVD : number | null = null;

  /**
   * 
   * @type {(string | null)}
   */
  presentationImgPath: string | null = null;

  /**
   * 
   * @type {(string | null)}
   */
  brandImgPath: string | null = null;

  /**
   * 
   */
  hasExistingStock = false;

  /**
   * 
   */
  isModalOpen = false;

  /**
   * 
   */
  enablePreviewViewButton = false;

  /**
   * 
   */
  isHovered = false;

  /**
   * 
   */
  isLogged = false;
  
  /**
  * Store reference (user.isLogged)
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Store reference (user.loading)
   */
  isUserLoading$: Observable<boolean> = this.store.select(state => state.user.loading);

  /**
   * Creates an instance of OrgProductCardComponent.
   * @param {AuthService} authService
   * @param {ImageService} imageService
   * @param {ProductsService} productsService
   * @param {Store<{ user: { loading: boolean; isLogged: boolean } }>} store
   * @param {Router} router
   */
  constructor(
    public authService: AuthService,
    private imageService: ImageService,
    private productsService: ProductsService,
    private store: Store<{ user: { loading: boolean; isLogged: boolean } }>,
    private router: Router
  ) {
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
    this.presentationImgPath = this.imageService.getPresentationImage(this.product);
    this.brandImgPath = this.imageService.getBrandImage(this.product);
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
    this.authService.openLoginModal();
  }

  /**
   * Method for close previre modal event
   */
  closePreviewModal() {
    this.isModalOpen = false;
  }
}
