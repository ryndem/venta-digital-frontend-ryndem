import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-loader-circle',
  templateUrl: './atm-loader-circle.component.html',
  styleUrls: ['./atm-loader-circle.component.scss'],
})
export class AtmLoaderCircleComponent {
  @Input()
  message: string | null = null;
}
