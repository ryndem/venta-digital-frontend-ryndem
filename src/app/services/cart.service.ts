import { HttpClient } from '@angular/common/http';
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
    private httpClient: HttpClient) {}

  async getShoppingCart() {
    return firstValueFrom(this.httpClient.post<ShoppingCart>(this.apiPath+ '/GetShoppingCart', {}));
  }

  async load() {
    try {
      let cart = await this.getShoppingCart();
      this.cart = cart;
      this.store.dispatch(updateCart({ shoppingCart: cart}));
    } catch( error ) {
      this.store.dispatch(updateCart({ shoppingCart: null}));
    }
  }


  
  async addProduct(product: Product, quantity: number) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))
    const temp = this.products.find( (p) => p.product.idProduct == product.idProduct );

    if (!temp) {
      this.products.push({ product: product, quantity: quantity, alternatives: null, complementaries: null });
    } else {
      temp.quantity = quantity;
    }
    
    let body = {
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



  async submit( quoteId: string, addressId: string | null ) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    let body = {
      idQuotation: quoteId,
      addressId: addressId,
      listQuotationItem: this.cart?.listQuotationItem,
      refresh: true,
    }
    
    try {
      await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/SendQuotation', body));
    } catch( error ) {
    }
    this.load();
  }



  async updateQuantity(quoteItemId: string, quantity: number) {
    this.store.dispatch(updateCartIsLoading({ isLoading: true}))

    let products: QuoteProduct[] = JSON.parse(JSON.stringify(this.cart?.listQuotationItem));
    let product = products.find(p => p.idQuotationItem == quoteItemId);

    if(product) {
      product.quantity = quantity;

      let body = {
        idQuotation: this.cart?.quotationDetails.idQuotation,
        refresh: false,
        listQuotationItem: products
      };

      try {
        await firstValueFrom(this.httpClient.post<string>(this.apiPath+ '/RefreshShoppingCart', body));
      } catch ( error ) {
      }
      this.load();
    }
  }

}
