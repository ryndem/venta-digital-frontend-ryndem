import { Component, Input } from '@angular/core';
import { Product } from 'app/model/product';

/**
 * Component to show product details
 * @export
 * @class OrgProductDetailsComponent
 */
@Component({
  selector: 'org-product-details',
  templateUrl: './org-product-details.component.html',
  styleUrls: ['./org-product-details.component.scss'],
})
export class OrgProductDetailsComponent {
  
  /**
   * Product object to show
   * @type {Product | null}
   */
  @Input() product?: Product | null;
  
}
