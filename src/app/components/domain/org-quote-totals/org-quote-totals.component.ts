import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

@Component({
  selector: 'org-quote-totals',
  templateUrl: './org-quote-totals.component.html',
  styleUrl: './org-quote-totals.component.scss'
})
export class OrgQuoteTotalsComponent {

  @Input()
  quote!: ShoppingCart;
  
}
