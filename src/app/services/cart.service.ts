import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartProduct } from 'app/model/cart-product';
import { Product } from 'app/model/product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { updateCart, updateCartIsLoading } from 'app/store/cart/cart.actions';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from './notification.service';
import { QuoteProduct } from 'app/model/quote-product';
import { RefreshShoppingCartResponse } from 'app/model/refresh-shpping-cart-response';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiPath: string = environment.apiUrl + '/Quotation';
  cart: ShoppingCart | null = null;
  products: CartProduct[] = [];

  constructor(
    private notificationService: NotificationService,
    private store: Store<any>,
    private httpClient: HttpClient
  ) {}

  async getShoppingCart() {
    return firstValueFrom(this.httpClient.post<ShoppingCart>(this.apiPath+ '/GetShoppingCart', {}));
  }

  async load() {
    try {
      const cart = await this.getShoppingCart();
      this.cart = cart;
      this.store.dispatch(updateCart({ shoppingCart: cart}));
    } catch( error ) {
      this.store.dispatch(updateCart({ shoppingCart: null}));
    }
  }


  async addProduct(product: Product, quantity: number) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    if(this.cart?.listQuotationItem) {
      const products: QuoteProduct[] = JSON.parse(JSON.stringify(this.cart?.listQuotationItem));
      const quoteProduct = products.find(p => p.idProduct == product.idProduct);
      if(quoteProduct) {
        await this.updateQuantity(quoteProduct.idQuotationItem, quoteProduct.quantity+quantity);
        this.notificationService.showSuccess('Producto agregado');
        return;
      }
    }


    const body = {
      productId: product.idProduct,
      quantity: quantity,
      hasStock: product.hasStock,
      priceWeb: product.offert?.unitPrice,
      expressFreightAvailable: product.hasExpressFreight
    }
    try {
      await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/PutShoppingCart', body));
      this.notificationService.showSuccess('Producto agregado');
    } catch(error: any) {
      this.notificationService.showError(error.error.detail);
    }
    this.load();
  }


  async submit(quoteId: string, addressId: string | null, cartItems: QuoteProduct[] ) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    const body = {
      idQuotation: quoteId,
      addressId: addressId,
      listQuotationItem: cartItems,
      refresh: true,
    }
   await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/SendQuotation', body));
  }

  async updateQuantity(quoteItemId: string, quantity: number) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    const products: QuoteProduct[] = JSON.parse(JSON.stringify(this.cart?.listQuotationItem));
    const product = products.find(p => p.idQuotationItem == quoteItemId);

    if(product) {
      product.quantity = quantity;

      const body = {
        idQuotation: this.cart?.quotationDetails.idQuotation,
        refresh: false,
        listQuotationItem: products
      };

      try {
        await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/RefreshShoppingCart', body));
      } catch ( error ) {
        console.error(error);
      }
      this.load();
    }
  }

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
