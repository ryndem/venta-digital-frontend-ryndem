import { Component, Input } from '@angular/core';
import { CategoryCardProps } from 'app/model-props/category-card-props';

@Component({
  selector: 'atm-category-card',
  templateUrl: './atm-category-card.component.html',
  styleUrls: ['./atm-category-card.component.scss'],
})

export class AtmCategoryCardComponent {

  @Input() category: CategoryCardProps | null = null;
  
}
