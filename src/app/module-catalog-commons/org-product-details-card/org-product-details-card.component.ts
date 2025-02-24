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
import { Observable } from 'rxjs';
import { selectCartIsLoading } from 'app/store/selectors/cart.selectors';
import { selectUserIsLogged } from 'app/store/selectors/user.selectors';
import { updateIsLoginModalOpened } from 'app/store/actions/user.actions';
import { addProductToCart } from 'app/store/actions/cart.actions';
import { selectProductPriceVD, selectProductPriceWeb } from 'app/store/selectors/product.selectors';
import { loadProductPrice } from 'app/store/actions/product.actions';

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
   * @type {Product | null}
   */
  @Input() product?: Product | null;

  /**
   * Flag to hide/show all details
   */
  @Input() showSeeAllDetails = false;

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
   * Flag to track if the prices has already loaded
   */
  isPriceLoaded = false;
  
  /**
   * Store reference (user.isLogged)
   */
  isLogged$: Observable<boolean | null>;

  /**
   * Store reference (cart.isLoading)
   */
  isAddingToCar$: Observable<boolean>;

  priceVD$: Observable<number | null>;

  priceWeb$: Observable<number | null>;


  /**
   * Creates an instance of OrgProductDetailsCardComponent.
   * @param {AuthService} authService
   * @param {ProductsService} productsService
   * @param {ImageUtils} imageUtils
   * @param {Store} store
   */
  constructor(
    private imageUtils: ImageUtils,
    private store: Store,
  ) {
    this.isAddingToCar$ = this.store.select(selectCartIsLoading);
    this.isLogged$ = this.store.select(selectUserIsLogged);
    this.priceVD$ = this.store.select(selectProductPriceVD(this.product?.idProduct || ''));
    this.priceWeb$ = this.store.select(selectProductPriceWeb(this.product?.idProduct || ''));

    this.isLogged$.subscribe(value => {
      if (value != this.isLogged) {
        this.isLogged = value === true;
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
      this.priceVD$ = this.store.select(selectProductPriceVD(this.product?.idProduct || ''));
      this.priceWeb$ = this.store.select(selectProductPriceWeb(this.product?.idProduct || ''));
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
    if(this.product && !this.isPriceLoaded) {
      this.store.dispatch(loadProductPrice({ productId: this.product.idProduct}))
      this.isPriceLoaded = true;
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
