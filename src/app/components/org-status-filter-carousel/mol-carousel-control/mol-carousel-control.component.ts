import { Component, Input } from '@angular/core';
import { ControlPosition } from '../../../model/status-filter-carousel';

@Component({
  selector: 'mol-carousel-control',
  templateUrl: './mol-carousel-control.component.html',
  styleUrls: ['./mol-carousel-control.component.scss'],
})
export class MolCarouselControlComponent {
  @Input() position!: ControlPosition;
  @Input() iconName!: string;
  @Input() enabled!: boolean;
}
