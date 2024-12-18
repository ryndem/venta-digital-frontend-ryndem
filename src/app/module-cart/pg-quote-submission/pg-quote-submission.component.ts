import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from 'app/model/address';
import { QuoteProduct } from 'app/model/quote-product';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';
import { NotificationService } from 'app/services/notification.service';
import { ShoppingCartState } from 'app/store/cart/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-quote-submission',
  templateUrl: './pg-quote-submission.component.html',
  styleUrls: ['./pg-quote-submission.component.scss'],
})
export class PgQuoteSubmissionComponent implements OnInit {

  addressId = '';
  shoppingCart : ShoppingCart | null = null;

  shoppingCart$: Observable<ShoppingCart | null> = this.store.select(state => state.cart.shoppingCart);
  isLoading$: Observable<boolean> = this.store.select(state => state.cart.isLoading);

  constructor(
    private cartService : CartService,
    private notificationService : NotificationService,
    private store: Store<{ cart: ShoppingCartState}>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.shoppingCart$.subscribe(value => {
      this.shoppingCart = value;
      this.changeDetectorRef.markForCheck();
    })

  }

  hasProductWithExpressFreight() {
    return this.shoppingCart && this.shoppingCart.listQuotationItem.some(
      it => it.expressFreightAvailable
    )
  }

  async ngOnInit(): Promise<void> {
    await this.cartService.load();
  }

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
      this.notificationService.showError('No se pudo enviar la cotización');
    }
  }

  async onAddressSelected(event: Address) {
    this.addressId = event.idAddress;
    await this.cartService.load();
    await this.cartService.updateShippingAddress(event.idAddress);
  }

  async onOtherSelected() {
    this.addressId = 'other';
    await this.cartService.load();
  }

  async onExpressFreightChange(event: { product: QuoteProduct, checked: boolean }) {
    await this.cartService.updateFreightExpress(
      event.product.idQuotationItem,
      event.checked,
      this.addressId,
      this.shoppingCart!.listQuotationItem
    );
  }
}
