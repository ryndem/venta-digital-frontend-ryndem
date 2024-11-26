import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { Product } from 'app/model/product';
import { ImageService } from 'app/services/image.service';
import { ProductsService } from 'app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'org-product-card',
  templateUrl: './org-product-card.component.html',
  styleUrls: ['./org-product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;

  priceWeb : number | null = null;
  priceVD : number | null = null;

  presentationImgPath: string | null = null;
  brandImgPath: string | null = null;
  hasExistingStock = false;
  isLogged = false;
  isModalOpen = false;
  enablePreviewViewButton = false;
  isHovered = false;
  isUserLoading = true;

  constructor(
    public authService: AuthService,
    private imageService: ImageService,
    private productsService: ProductsService,
    private store: Store<{ user: { loading: boolean; isLogged: boolean } }>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
      this.isUserLoading = state.user.loading;
      if (this.isLogged != state.user.isLogged) {
        this.isLogged = state.user.isLogged;
        this.loadPriceOffer();
      }
    });
  }

  ngOnInit(): void {
    this.enablePreviewViewButton = this.router.url === '/';
    this.presentationImgPath = this.imageService.getPresentationImage(this.product);
    this.brandImgPath = this.imageService.getBrandImage(this.product);
    this.setHasExistingStock();
    this.loadPriceOffer();
  }

  private setHasExistingStock() {
    this.hasExistingStock =
      this.product?.hasStock && (this.product?.existingStockQuantity || 0) > 0;
  }

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

  isProductEligible(product: Product): boolean {
    return product.offert?.deliveryTimeDays > 0 &&
      !this.hasExistingStock &&
      product.typeKey !== 'training' &&
      product.typeKey !== 'publications';
  }

  openPreviewViewModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isModalOpen = true;
  }

  openLoginModal(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.authService.openLoginModal();
  }

  closePreviewModal() {
    this.isModalOpen = false;
  }
}
