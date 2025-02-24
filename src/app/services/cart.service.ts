import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartProduct } from 'app/model/cart-product';
import { Product } from 'app/model/product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { updateCart, updateCartIsLoading } from 'app/store/actions/cart.actions';
import { environment } from 'environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { QuoteProduct } from 'app/model/quote-product';
import { RefreshShoppingCartResponse } from 'app/model/refresh-shpping-cart-response';
import { Address } from 'app/model/address';
import { UserState } from 'app/store/states/user.state';
import { selectUserAddresses } from 'app/store/selectors/user.selectors';
import { Router } from '@angular/router';
import { showErrorNotification } from 'app/store/actions/view.actions';


/**
 * Service to manage the shopping cart API calls
 * @export
 * @class CartService
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {

  /**
   * API base path for the cart requests
   */
  private apiPath: string = environment.apiUrl + '/Quotation';

  /**
  * Logged user shopping cart loaded
  */
  cart: ShoppingCart | null = null;

  /**
  * Products included on the logged user shopping cart
  */
  products: CartProduct[] = [];

  /**
   * Id of the logged user's first address
   */
  firstAddressId: string | null = null;

  /**
  * Store reference (user.addresses)
  */
  addresses$: Observable<Address[] | null>;

  /**
   * Creates an instance of CartService.
   * @param {NotificationService} notificationService
   * @param {Store<{ user: UserState }>} store
   * @param {HttpClient} httpClient,
   * @param {Router} router,
   */
  constructor(
    private notificationService: NotificationService,
    private store: Store<UserState>,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.addresses$ = this.store.select(selectUserAddresses);
    this.addresses$.subscribe(value => {
      this.firstAddressId = value?.length ? value[0].idAddress : null;
    })
  }

  /**
  * Method to load shopping cart from API
  * @returns Promise of the current user shopping cart
  */
  async getShoppingCart() {
    return firstValueFrom(this.httpClient.post<ShoppingCart>(this.apiPath+ '/GetShoppingCart', {}));
  }

  /**
  * Method to update and store the current user shopping cart
  */
  async load() {
    try {
      const cart = await this.getShoppingCart();
      this.cart = cart;
      this.store.dispatch(updateCart({ shoppingCart: cart}));
    } catch( error ) {
      this.cart = null;
      this.store.dispatch(updateCart({ shoppingCart: null}));
    }
  }

  /**
  * Method to update and store the current user shopping cart
  */
  async setCart(shoppingCart: ShoppingCart | null) {
      this.cart = shoppingCart;
  }

  /**
  * Method to add a product to the current user shopping cart
  * @param {Product} product Product to add to the cart
  * @param {number} quantity Quantity of the product to add to the cart
  */
  async addProduct(product: Product, quantity: number) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    if(this.cart?.listQuotationItem) {
      const products: QuoteProduct[] = JSON.parse(JSON.stringify(this.cart?.listQuotationItem));
      const quoteProduct = products.find(p => p.idProduct == product.idProduct);
      if(quoteProduct) {
        await this.updateQuantity(quoteProduct.idQuotationItem, quoteProduct.quantity+quantity);
        this.notificationService.showSuccess('Producto agregado a tu carrito.');
        return;
      }
    }

    const body = {
      productId: product.idProduct,
      quantity: quantity,
      hasStock: product.hasStock,
      priceWeb: product.offert?.unitPrice,
      expressFreightAvailable: product.hasExpressFreight,
      IdDeliveryAddress: this.firstAddressId,
    }

    try {
      await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/PutShoppingCart', body));
      this.notificationService.showSuccess('Producto agregado a tu carrito.');
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error && error.error.detail) {
          this.notificationService.showError(error.error.detail);
        } else {
          this.notificationService.showError(
            'Ocurrió un error al agregar el producto al carrito, si el problema persiste contacta a soporte'
          )
        }
      }
    }
    this.load();
  }

  /**
  * Method to add again a removed product to the shopping cart
  * @param {QuoteProduct} quoteProduct Quote product to add to the cart
  */
  async reAddProduct(quoteProduct: QuoteProduct) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    const body = {
      productId: quoteProduct.idProduct,
      quantity: 1,
      hasStock: true,
      priceWeb: quoteProduct.unitPrice,
      expressFreightAvailable: quoteProduct.expressFreightAvailable,
      IdDeliveryAddress: this.firstAddressId
    }
    try {
      await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/PutShoppingCart', body));
      this.notificationService.showSuccess('Producto agregado a tu carrito.');
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error && error.error.detail) {
          this.notificationService.showError(error.error.detail);
        } else {
          this.notificationService.showError(
            'Ocurrió un error al agregar el producto al carrito, si el problema persiste contacta a soporte'
          )
        }
      }
    }
    this.load();
  }


  /**
  * Method to send the current user shopping cart as quote
  * @param {string} quoteId Quote id to submit
  * @param {string | null} addressId Quote's address id to submit
  * @param {QuoteProduct[]} cartItems Items to include on the submition
  */
  async submit(quoteId: string, addressId: string | null, cartItems: QuoteProduct[] ) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    const body = {
      idQuotation: quoteId,
      addressId: addressId,
      listQuotationItem: cartItems,
      refresh: true,
    }

    try {
      await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/SendQuotation', body));
      this.router.navigate(['cart/thank-you'], {
        queryParams: {
          quoteId: quoteId
        }
      });
    } catch (error) {
      this.store.dispatch(showErrorNotification({ message: 'No se pudo enviar la cotización'}));
    }
    this.load();
  }

  /**
  * Method to update the quantity of a product in the shopping cart
  * @param {string} quoteItemId Quote Item Id to update quantity
  * @param {number} quantity Quote Item new quantity
  */
  async updateQuantity(quoteItemId: string, quantity: number) {
    if (!this.cart) return;

    this.store.dispatch(updateCartIsLoading({ isLoading: true })); // Set loading to true

    try {
      const products: QuoteProduct[] = JSON.parse(JSON.stringify(this.cart?.listQuotationItem));
      const product = products.find((p) => p.idQuotationItem === quoteItemId);

      if (!product) return;

      product.quantity = quantity;
      const body = {
        idQuotation: this.cart?.quotationDetails.idQuotation,
        refresh: false,
        addressId: this.firstAddressId,
        listQuotationItem: products,
      };

      await firstValueFrom(this.httpClient.post<string>(this.apiPath + '/RefreshShoppingCart', body));
      this.load();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      this.store.dispatch(updateCartIsLoading({ isLoading: false }));
    }
  }


  /**
  * Method to update de freight express attribute on a shopping cart product
  * @param {string} quoteItemId Quote Item Id to update express freight
  * @param {boolean} appliesFreightExpress Value for express freight
  * @param {string} addressId Quote's address id
  * @param {QuoteProduct[]} cartItems Cart items to update express freight
  */
  async updateFreightExpress(
    quoteItemId: string,
    appliesFreightExpress: boolean,
    addressId: string,
    cartItems: QuoteProduct[],
  ) {
    if(!addressId) return;
    this.store.dispatch(updateCartIsLoading({ isLoading: true }));

    const products: QuoteProduct[] = JSON.parse(JSON.stringify(cartItems));
    const product = products.find(p => p.idQuotationItem == quoteItemId);

    if (product) {
      const targetBrand = product.brandName;

      products.forEach(p => {
        if (p.brandName === targetBrand || p.idQuotationItem === quoteItemId) {
          p.appliesFreightExpress = appliesFreightExpress;
        }
      });

      const body = {
        idQuotation: this.cart?.quotationDetails.idQuotation,
        addressId: addressId,
        refresh: true,
        listQuotationItem: products,
      };

      try {
        const response  = await firstValueFrom(this.httpClient.post<RefreshShoppingCartResponse>(
          this.apiPath + '/RefreshShoppingCart', body)
        );
        if (this.cart) {
          this.store.dispatch(updateCart({ shoppingCart: {
            ...this.cart,
            listQuotationItem: products,
            freightExpressDetails: response.freightExpressDetails,
            freightOutsiderDetails: response.freightOutsiderDetails,
            quotationDetails: {
              ...this.cart.quotationDetails,
              subtotal: response.subtotal,
              saleTax: response.saleTax,
              total: response.total,
            }
          }}));
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          if (error.error && error.error.detail) {
            this.notificationService.showError(error.error.detail);
          } else {
            this.notificationService.showError("Ocurrió un problema.");
          }
        }
      } finally {
        this.store.dispatch(updateCartIsLoading({ isLoading: false }));
      }
    }
  }


  /**
  * Method to update the address attribute of the shopping cart
  * @param {string} addressId Shopping cart new address id
  */
  async updateShippingAddress(addressId: string) {
    if (!addressId) return;
    this.store.dispatch(updateCartIsLoading({ isLoading: true }));

    const body = {
      idQuotation: this.cart?.quotationDetails.idQuotation,
      addressId: addressId,
      refresh: true,
      listQuotationItem: this.cart?.listQuotationItem,
    };

    try {
      const response = await firstValueFrom(this.httpClient.post<RefreshShoppingCartResponse>(
        this.apiPath + '/RefreshShoppingCart', body)
      );
      if (this.cart) {
        this.store.dispatch(updateCart({
          shoppingCart: {
            ...this.cart,
            freightExpressDetails: response.freightExpressDetails,
            freightOutsiderDetails: response.freightOutsiderDetails,
            quotationDetails: {
              ...this.cart.quotationDetails,
              subtotal: response.subtotal,
              saleTax: response.saleTax,
              total: response.total,
            }
          }
        }));
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error && error.error.detail) {
          this.notificationService.showError(error.error.detail);
        } else {
          this.notificationService.showError("Ocurrió un problema.");
        }
      }
    } finally {
      this.store.dispatch(updateCartIsLoading({ isLoading: false }));
    }
  }

}
