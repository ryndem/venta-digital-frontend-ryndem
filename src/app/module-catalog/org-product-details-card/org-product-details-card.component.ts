import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { ImageService } from 'app/services/image.service';
import { ProductsService } from 'app/services/products.service';
import { CartService } from 'app/services/cart.service';
import { AuthService } from 'app/module-auth/auth.service';
import { UserState } from 'app/store/reducers/user.reducer';
import { ShoppingCartState } from 'app/store/reducers/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-product-details-card',
  templateUrl: './org-product-details-card.component.html',
  styleUrls: ['./org-product-details-card.component.scss'],
})
export class OrgProductDetailsCardComponent implements OnChanges {

  @Input()
  product?: Product;

  @Input()
  showSeeAllDetails = false;

  priceVD: number | null = null;
  priceWeb: number | null = null;
  isControlled = false;
  productUnits = 1;
  presentationImgPath: string | null = null;
  brandImgPath: string | null = null;

  isLogged = false;
  
  /**
  * Store references
  */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private productsService: ProductsService,
    private imageService: ImageService,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>,
  ) {

    this.isLogged$.subscribe(value => {
      if (value != this.isLogged) {
        this.isLogged = value;
        this.loadPriceOffer();
      }
    });
  }

  get productUnitIsNotAnInteger(){
    return !Number.isInteger(this.productUnits);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product: SimpleChange = changes['product'];
    if (product) {
      this.presentationImgPath = this.imageService.getPresentationImage(this.product || null);
      this.brandImgPath = this.imageService.getBrandImage(this.product || null);
      this.isControlled = this.product?.controlled ? true : false;
      this.loadPriceOffer();
    }
  }

  updateProductUnits(productUnits: number) {
    this.productUnits = productUnits;
  }

  async loadPriceOffer() {
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

  async addToQuotation() {
    try {
      if (!this.isLogged) {
        this.authService.openLoginModal();
        return;
      }

      await this.cartService.addProduct(this.product!, this.productUnits);
    } catch (error) {
      console.error(error);
    }
  }

  openLoginModal(event: Event) {
    event.preventDefault();
    this.authService.openLoginModal();
  }

}
