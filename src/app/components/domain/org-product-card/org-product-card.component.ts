import { Component, Input } from '@angular/core';
import { Product } from 'app/model/product';

@Component({
  selector: 'org-product-card',
  templateUrl: './org-product-card.component.html',
  styleUrl: './org-product-card.component.scss'
})
export class ProductCardComponent {

  @Input()
  product!: Product;

}
