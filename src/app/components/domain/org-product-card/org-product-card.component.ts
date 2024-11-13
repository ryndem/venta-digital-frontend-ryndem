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
  price : number | null = null;

  presentationImgPath: string | null = null;
  brandImgPath: string | null = null;
  hasExistingStock = false;
  isLogged = false;
  isModalOpen = false;
  enablePreviewViewButton = false;
  isHovered = false;

  constructor(
    public authService: AuthService,
    private imageService: ImageService,
    private productsService: ProductsService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.subscribe((state) => {
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
    this.price = this.product?.offert.unitPrice;
    this.setHasExistingStock();
    this.loadPriceOffer();
  }

  private setHasExistingStock() {
    this.hasExistingStock =
      this.product?.hasStock && (this.product?.existingStockQuantity || 0) > 0;
  }

    private async loadPriceOffer() {
    this.price = this.product?.offert.unitPrice;

    if( !this.priceWeb ) {
      const webOffert = await this.productsService.getProductOfferWeb( this.product?.idProduct );
      this.priceWeb = webOffert.unitPrice;
    }

    if(!this.priceVD && this.isLogged) {
      const offert = await this.productsService.getProductOfferVD( this.product?.idProduct );
      this.priceVD = offert.unitPrice;
      this.price = this.priceVD;
    }

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
}
