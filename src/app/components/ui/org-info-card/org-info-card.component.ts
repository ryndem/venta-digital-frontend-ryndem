import { Component, Input } from '@angular/core';

@Component({
  selector: 'org-info-card',
  templateUrl: './org-info-card.component.html',
  styleUrls: ['./org-info-card.component.scss'],
})
export class InfoCardComponent {
  @Input()
  title = '';

  @Input()
  description = '';
}
