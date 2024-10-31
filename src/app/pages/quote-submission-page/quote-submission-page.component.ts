import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from 'app/model/address';
import { ShoppingCart } from 'app/model/shopping-cart';
import { CartService } from 'app/services/cart.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'quote-submission-page',
  templateUrl: './quote-submission-page.component.html',
  styleUrl: './quote-submission-page.component.scss',
})
export class QuoteSubmissionPageComponent implements OnInit {

  isLoading: boolean = true;
  shoppingCart : ShoppingCart | null = null;
  selectedAddress: Address | null = null;
  addressId: string = '';

  constructor( 
    private cartService : CartService, 
    private notificationService : NotificationService,
    private store: Store<any>, 
    private router: Router) {

    this.store.subscribe( event => {
      this.shoppingCart = event.cart.shoppingCart;
      this.isLoading = event.cart.isLoading;
    });

  }

  async ngOnInit(): Promise<void> {
    await this.cartService.load();
  }

  async submitQuote() {
    if(!this.shoppingCart || !this.addressId) 
      return;
    
    let addressId: string | null = this.addressId == 'other'? null : this.addressId;
    try {
      await this.cartService.submit(this.shoppingCart.quotationDetails.idQuotation, addressId);
      this.router.navigate(['thank-you'], {
        queryParams: {
          quoteId: this.shoppingCart.quotationDetails.idQuotation
        }});
    } catch (error) {
      this.notificationService.showError('No se pudo enviar la cotización');
    }
  }

  onAddressSelected(event:any) {
    this.addressId = event.idAddress;
  }
  onOtherSelected(event:any) {
    this.addressId = 'other';
  }

}
