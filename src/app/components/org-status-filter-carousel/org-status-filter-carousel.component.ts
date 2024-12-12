import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { EControlPosition } from '../../model/status-filter-carousel';

@Component({
  selector: 'status-filter-carousel',
  templateUrl: './org-status-filter-carousel.component.html',
  styleUrls: ['./org-status-filter-carousel.component.scss'],
})
export class OrgStatusFilterCarouselComponent implements OnInit {
  @ViewChild('options') options!: ElementRef;
  @ViewChildren('item') items!: QueryList<ElementRef>;

  readonly eControlPosition = EControlPosition;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

  move(isNext: boolean): void {
    const item: number = this.items.first?.nativeElement?.clientWidth;

    console.warn('this.items.length', this.items.length);

    this.items.forEach(item => console.warn(item));

    const carousel = this.options.nativeElement;

    carousel.scrollLeft = isNext
      ? carousel.scrollLeft + item + 150
      : carousel.scrollLeft - item - 150;

    console.warn('carousel.scrollLeft', carousel.scrollLeft);
  }
}
