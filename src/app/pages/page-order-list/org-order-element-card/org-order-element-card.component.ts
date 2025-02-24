import { Component, Input } from '@angular/core';
import { QuoteItem } from 'app/model/quote';

/**
 * Component to display order item card
 * @export
 * @class OrgOrderElementCardComponent
 */
@Component({
  selector: 'org-order-element-card',
  templateUrl: './org-order-element-card.component.html',
  styleUrls: ['./org-order-element-card.component.scss'],
})
export class OrgOrderElementCardComponent {

  /**
   * Order element quote item
   * @type {QuoteItem}
   */
  @Input() quote!: QuoteItem;
}
