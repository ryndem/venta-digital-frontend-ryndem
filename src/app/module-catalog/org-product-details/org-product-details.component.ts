import { Component, Input } from '@angular/core';
import { Product } from 'app/model/product';

@Component({
  selector: 'org-product-details',
  templateUrl: './org-product-details.component.html',
  styleUrls: ['./org-product-details.component.scss'],
})
export class OrgProductDetailsComponent {
  
  @Input() product?: Product;
  
}
