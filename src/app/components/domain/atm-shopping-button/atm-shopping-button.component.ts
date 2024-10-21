import { Component, Input } from '@angular/core';
import { Product } from 'app/model/product';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'atm-shopping-button',
  templateUrl: './atm-shopping-button.component.html',
  styleUrl: './atm-shopping-button.component.scss',
})
export class ShoppingButtonComponent {
  @Input()
  product!: Product;

  constructor(private quoteService: QuotesService) {}

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.quoteService.addProduct(this.product, 1);
  }
}
