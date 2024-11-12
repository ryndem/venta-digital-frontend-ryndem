import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PriceOffert } from 'app/model/price-offert';
import { Product } from 'app/model/product';
import { ImageService } from 'app/services/image.service';
import { ProductsService } from 'app/services/products.service';
import { CartService } from 'app/services/cart.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'org-product-details-card',
  templateUrl: './org-product-details-card.component.html',
  styleUrls: ['./org-product-details-card.component.scss'],
})
export class OrgProductDetailsCardComponent implements OnChanges {
  isControlled = false;
  isLogged = false;
  isAddingToCar = false;

  productUnits = 1;

  presentationImgPath: string | null = null;
  brandImgPath: string | null = null;

  @Input()
  product?: Product;

  @Input()
  showSeeAllDetails = false;

  offert: PriceOffert | null = null;

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private productsService: ProductsService,
    private imageService: ImageService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isAddingToCar = state.cart.isLoading;

      if(this.isLogged != state.user.isLogged) {
        this.isLogged = state.user.isLogged;
        this.loadPriceOffer();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product: SimpleChange = changes['product'];
    if (product) {
      this.presentationImgPath = this.imageService.getPresentationImage(this.product || null);
      this.brandImgPath = this.imageService.getBrandImage(this.product || null);
      this.loadPriceOffer();
      this.isControlled = this.product?.controlled ? true : false;
    }
  }

  updateProductUnits(delta: number) {
    this.productUnits += delta;

    if (this.productUnits < 1) {
      this.productUnits = 1;
    }
  }

  async loadPriceOffer() {
    if (this.isLogged && this.product) {
      this.offert = await this.productsService.getProductOfferVD(
        this.product.idProduct,
      );
    } else {
      this.offert = null;
    }
  }

  async addToQuotation() {
    try {
      if (!this.isLogged) {
        this.authService.openLoginModal();
        return;
      }

      await this.cartService.addProduct(this.product!, this.productUnits);
    } catch (error: any) {
      console.error(error);
    }
  }

  openLoginModal(event: Event) {
    event.preventDefault();
    this.authService.openLoginModal();
  }

}
