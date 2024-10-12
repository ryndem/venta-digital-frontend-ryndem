import { Component, Input } from '@angular/core';

@Component({
  selector: 'mol-nav-button',
  templateUrl: './mol-nav-button.component.html',
  styleUrl: './mol-nav-button.component.scss',
})
export class NavButtonComponent {
  @Input()
  disabled: boolean = false;

  @Input()
  class: string = '';
}
