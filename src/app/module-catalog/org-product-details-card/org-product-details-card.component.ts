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

/**
 * Component to show product details
 * @export
 * @class OrgProductDetailsCardComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-product-details-card',
  templateUrl: './org-product-details-card.component.html',
  styleUrls: ['./org-product-details-card.component.scss'],
})
export class OrgProductDetailsCardComponent implements OnChanges {

  /**
   * Product to show details
   * @type {Product}
   */
  @Input() product?: Product;

  /**
   * Flag to hide/show all details
   */
  @Input() showSeeAllDetails = false;

  /**
   * Direct sell price
   * @type {(number | null)}
   */
  priceVD: number | null = null;

  /**
   * Public web price
   * @type {(number | null)}
   */
  priceWeb: number | null = null;

  /**
   * Flag to show if the product is controlled
   */
  isControlled = false;

  /**
   * Product units selected
   */
  productUnits = 1;

  /**
   * Image path of the product presentation
   * @type {(string | null)}
   */
  presentationImgPath: string | null = null;

  /**
   * Image path of the product brand
   * @type {(string | null)}
   */
  brandImgPath: string | null = null;

  /**
   * Flag to show if the user is logged
   */
  isLogged = false;
  
  /**
   * Store reference (user.isLogged)
   */
  isLogged$: Observable<boolean> = this.store.select(state => state.user.isLogged);

  /**
   * Store reference (cart.isLoading)
   */
  isAddingToCar$: Observable<boolean> = this.store.select(state => state.cart.isLoading);


  /**
   * Creates an instance of OrgProductDetailsCardComponent.
   * @param {CartService} cartService
   * @param {AuthService} authService
   * @param {ProductsService} productsService
   * @param {ImageService} imageService
   * @param {Store<{ user: UserState, cart: ShoppingCartState }>} store
   * @memberof OrgProductDetailsCardComponent
   */
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

  /**
   * Method to valide if product units are an integer
   * @readonly
   */
  get productUnitIsNotAnInteger() {
    return !Number.isInteger(this.productUnits);
  }

  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const product: SimpleChange = changes['product'];
    if (product) {
      this.presentationImgPath = this.imageService.getPresentationImage(this.product || null);
      this.brandImgPath = this.imageService.getBrandImage(this.product || null);
      this.isControlled = this.product?.controlled ? true : false;
      this.loadPriceOffer();
    }
  }

  /**
   * Method to update product units
   * @param {number} productUnits
   */
  updateProductUnits(productUnits: number) {
    this.productUnits = productUnits;
  }

  /**
   * Method to load product price offer
   */
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

  /**
   * Method to manage a product to shopping cart
   * @return {*} 
   */
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

  /**
   * Method to open login modal
   * @param {Event} event
   */
  openLoginModal(event: Event) {
    event.preventDefault();
    this.authService.openLoginModal();
  }

}
