import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Address } from 'app/model/address';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { loadCart, submitShoppingCart, updateCartShippingAddress } from 'app/store/actions/cart.actions';
import { updateExpressFreight } from 'app/store/actions/order.actions';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectCartIsLoading, selectCurrentCart } from 'app/store/selectors/cart.selectors';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

/**
 * Page component to confirm quote creation
 * @export
 * @class PgQuoteSubmissionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pg-quote-submission',
  templateUrl: './pg-quote-submission.component.html',
  styleUrls: ['./pg-quote-submission.component.scss'],
})
export class PgQuoteSubmissionComponent implements OnInit {

  /**
   * Address id selected
   */
  addressId = '';

  /**
   * Current user's shopping cart
   * @type {(ShoppingCart | null)}
   */
  shoppingCart : ShoppingCart | null = null;

  /**
  * Store reference (cart.shoppingCart)
  */
  shoppingCart$: Observable<ShoppingCart | null>;

  /**
  * Store reference (cart.isLoading)
  */
  isLoading$: Observable<boolean>;

  /**
   * Creates an instance of PgQuoteSubmissionComponent.
   * @param {Store} store
   * @param {ChangeDetectorRef} changeDetectorRef
   */
  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.isLoading$ = this.store.select(selectCartIsLoading);
    this.shoppingCart$ = this.store.select(selectCurrentCart);
    this.shoppingCart$.subscribe(value => {
      this.shoppingCart = value;
      this.changeDetectorRef.markForCheck();
    });
    this.setMetaTags();
  }

  /**
   * Method to check if at least one element on the shopping cart has express freight available
   * @return {*} 
   */
  hasProductWithExpressFreight() {
    return this.shoppingCart && this.shoppingCart.listQuotationItem.some(
      it => it.expressFreightAvailable
    )
  }

  /**
   * Initializing method
   */
  async ngOnInit(): Promise<void> {
    this.store.dispatch(loadCart());
  }

  /**
   * Method to handle quote submition
   *
   * @return {*} 
   */
  async submitQuote() {
    if(!this.shoppingCart || !this.addressId) return;

    const addressId: string | null = this.addressId == 'other'? null : this.addressId;
    this.store.dispatch(submitShoppingCart({
      quoteId: this.shoppingCart.quotationDetails.idQuotation,
      addressId: addressId,
      cartItems: this.shoppingCart.listQuotationItem
    }));
  }

  /**
   * Method to listen address selection
   * @param {Address} event
   */
  async onAddressSelected(event: Address) {
    this.addressId = event.idAddress;
    this.store.dispatch(updateCartShippingAddress({addressId: event.idAddress}))
  }


  /**
   * Method to handle 'Other' Address selected
   */
  async onOtherSelected() {
    this.addressId = 'other';
    this.store.dispatch(loadCart());
  }

  /**
   * Method to listen express freight change
   * @param {{ product: QuoteProduct, checked: boolean }} event 
   */
  async onExpressFreightChange(event: { product: QuoteProduct, checked: boolean }) {
    this.store.dispatch(updateExpressFreight({
      quoteItemId: event.product.idQuotationItem,
      appliesFreightExpress: event.checked,
      addressId: this.addressId,
      cartItems: this.shoppingCart!.listQuotationItem
    }));
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Enviar Cotización - Proquifa', 
      tags: [
        {
          name: 'description',
          content: 'Revisa los productos de tu carrito, selecciona tu dirección de entrega y elige la opción de flete express si aplica. Envía tu cotización fácilmente en Proquifa.',
        },
        {
          name: 'keywords',
          content: 'enviar cotización, productos del carrito, dirección de entrega, flete express, Proquifa, cotización fácil',
        },
        {
          property: 'og:title',
          content: 'Enviar Cotización - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Gestiona los productos de tu carrito, selecciona dirección de entrega y envía tu cotización con Proquifa.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/cart/quote-submission`,
        },
        {
          name: 'twitter:title',
          content: 'Enviar Cotización - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Revisa tus productos, selecciona tu dirección y envía tu cotización de manera rápida y sencilla en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/cart/quote-submission`,
        },
      ]
    }));
  }

}
