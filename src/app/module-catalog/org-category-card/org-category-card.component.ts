import { Component, Input } from '@angular/core';
import { Category } from 'app/model/category';

/**
 * Component to display category card 
 * @export
 * @class OrgCategoryCardComponent
 */
@Component({
  selector: 'org-category-card',
  templateUrl: './org-category-card.component.html',
  styleUrls: ['./org-category-card.component.scss'],
})
export class OrgCategoryCardComponent {

  /**
   * Category object to display card
   * @type {(Category | null)}
   */
  @Input() category: Category | null = null;
}
