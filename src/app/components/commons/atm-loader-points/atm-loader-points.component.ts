import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-loader-points',
  templateUrl: './atm-loader-points.component.html',
  styleUrls: ['./atm-loader-points.component.scss'],
})
export class AtmLoaderPointsComponent {
  @Input()
  message: string | null = null;
}
