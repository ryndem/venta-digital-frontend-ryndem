import { Component, Input } from '@angular/core';
import { QuoteItem } from 'app/model/quote';

@Component({
  selector: 'org-order-element-card',
  templateUrl: './org-order-element-card.component.html',
  styleUrls: ['./org-order-element-card.component.scss'],
})
export class OrgOrderElementCardComponent {

  @Input()
  quote!: QuoteItem;
}
