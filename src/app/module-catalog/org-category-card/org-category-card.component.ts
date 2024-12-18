import { Component, Input } from '@angular/core';
import { Category } from 'app/model/category';

@Component({
  selector: 'org-category-card',
  templateUrl: './org-category-card.component.html',
  styleUrls: ['./org-category-card.component.scss'],
})
export class OrgCategoryCardComponent {
  @Input()
  category: Category | null = null;
}
