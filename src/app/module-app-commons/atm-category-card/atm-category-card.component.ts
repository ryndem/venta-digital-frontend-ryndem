import { Component, Input } from '@angular/core';
import { CategoryCardProps } from 'app/model-props/category-card-props';

/**
 * Component to display category card
 * @export
 * @class AtmCategoryCardComponent
 */
@Component({
  selector: 'atm-category-card',
  templateUrl: './atm-category-card.component.html',
  styleUrls: ['./atm-category-card.component.scss'],
})

export class AtmCategoryCardComponent {

  /**
   * Category card prop object to show
   * @type {(CategoryCardProps | null)}
   */
  @Input() category: CategoryCardProps | null = null;
  
}
