import { Component, Input } from '@angular/core';

@Component({
  selector: 'org-info-card',
  templateUrl: './org-info-card.component.html',
  styleUrl: './org-info-card.component.scss',
})
export class InfoCardComponent {
  @Input()
  title: String = '';

  @Input()
  description: String = '';
}
