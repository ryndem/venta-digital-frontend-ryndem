import { Component, Input } from '@angular/core';

@Component({
  selector: 'mol-nav-button',
  templateUrl: './mol-nav-button.component.html',
  styleUrls: ['./mol-nav-button.component.scss'],
})
export class NavButtonComponent {
  @Input()
  disabled = false;

  @Input()
  class = '';
}
