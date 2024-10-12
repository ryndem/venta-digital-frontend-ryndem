import { Component, Input } from '@angular/core';

export type CategoryCardProps = {
  key?: string;
  iconPath: string;
  label: string;
  description: string;
};

@Component({
  selector: 'atm-category-card',
  templateUrl: './atm-category-card.component.html',
  styleUrl: './atm-category-card.component.scss',
})
export class AtmCategoryCardComponent {
  @Input()
  category: CategoryCardProps | null = null;
}
