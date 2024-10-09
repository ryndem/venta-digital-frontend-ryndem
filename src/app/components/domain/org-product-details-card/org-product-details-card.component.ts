import { Component, Input } from '@angular/core';
import { Product } from 'app/model/product';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'org-product-details-card',
  templateUrl: './org-product-details-card.component.html',
  styleUrl: './org-product-details-card.component.scss'
})
export class OrgProductDetailsCardComponent {

  isControlled: boolean = false;

  productUnits: number = 1;

  @Input()
  product?: Product;

  constructor(private quoteService: QuotesService) {}

  updateProductUnits(delta: number) {
    this.productUnits += delta;

    if (this.productUnits < 1) {
      this.productUnits = 1;
    }

  }

  addToQuotation() {
    this.quoteService.addProduct(this.product!, this.productUnits);
  }

}
