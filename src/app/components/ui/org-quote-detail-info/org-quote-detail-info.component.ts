import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'app/model/shopping-cart';

@Component({
  selector: 'org-quote-detail-info',
  templateUrl: './org-quote-detail-info.component.html',
  styleUrls: ['./org-quote-detail-info.component.scss']
})
export class OrgQuoteDetailInfoComponent {
  @Input()
  quote!: ShoppingCart;
}
