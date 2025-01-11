import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/model/product';
import { ImageUtils } from 'app/utils/image.utils';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';
import { ShoppingCartState } from 'app/store/states/cart.state';
import { UserState } from 'app/store/states/user.state';
import { selectCartIsLoading } from 'app/store/selectors/cart.selectors';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';
import { addProductToCart } from 'app/store/actions/cart.actions';

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
  isLogged$: Observable<boolean>;

  /**
   * Store reference (cart.isLoading)
   */
  isAddingToCar$: Observable<boolean>;


  /**
   * Creates an instance of OrgProductDetailsCardComponent.
   * @param {AuthService} authService
   * @param {ProductsService} productsService
   * @param {ImageUtils} imageUtils
   * @param {Store<{ user: UserState, cart: ShoppingCartState }>} store
   */
  constructor(
    private productsService: ProductsService,
    private imageUtils: ImageUtils,
    private store: Store<{ user: UserState, cart: ShoppingCartState }>,
  ) {
    this.isAddingToCar$ = this.store.select(selectCartIsLoading);
    this.isLogged$ = this.store.select(selectUserIsLogged);
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
      this.presentationImgPath = this.imageUtils.getPresentationImage(this.product || null);
      this.brandImgPath = this.imageUtils.getBrandImage(this.product || null);
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
    if (!this.isLogged) {
      this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
      return;
    }

    this.store.dispatch(addProductToCart({product: this.product!, quantity: this.productUnits}));
  }

  /**
   * Method to open login modal
   * @param {Event} event
   */
  openLoginModal(event: Event) {
    event.preventDefault();
    this.store.dispatch(updateIsLoginModalOpened({ isLoginModalOpened: true }));
  }

}
