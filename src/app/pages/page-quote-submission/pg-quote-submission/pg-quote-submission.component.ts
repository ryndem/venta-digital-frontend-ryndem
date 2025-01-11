import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from 'app/model/address';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';
import { loadCart, updateCartShippingAddress } from 'app/store/actions/cart.actions';
import { showErrorNotification, updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { selectCartIsLoading, selectCurrentCart } from 'app/store/selectors/cart.selectors';
import { ShoppingCartState } from 'app/store/states/cart.state';
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
   * @param {CartService} cartService
   * @param {Store<{ cart: ShoppingCartState}>} store
   * @param {Router} router
   * @param {ChangeDetectorRef} changeDetectorRef
   */
  constructor(
    private cartService : CartService,
    private store: Store<{ cart: ShoppingCartState}>,
    private router: Router,
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
    try {
      await this.cartService.submit(
        this.shoppingCart.quotationDetails.idQuotation,
        addressId,
        this.shoppingCart.listQuotationItem,
      );
      this.router.navigate(['cart/thank-you'], {
        queryParams: {
          quoteId: this.shoppingCart.quotationDetails.idQuotation
        }
      });
    } catch (error) {
      this.store.dispatch(showErrorNotification({ message: 'No se pudo enviar la cotización'}));
    }
  }

  /**
   * Method to listen address selection
   * @param {Address} event
   */
  async onAddressSelected(event: Address) {
    this.addressId = event.idAddress;
    this.store.dispatch(loadCart());
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
    await this.cartService.updateFreightExpress(
      event.product.idQuotationItem,
      event.checked,
      this.addressId,
      this.shoppingCart!.listQuotationItem
    );
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
