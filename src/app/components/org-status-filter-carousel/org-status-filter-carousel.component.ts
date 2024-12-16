import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  EControlPosition,
  StatusFilterItem,
} from '../../model/status-filter-carousel';

@Component({
  selector: 'org-status-filter-carousel',
  templateUrl: './org-status-filter-carousel.component.html',
  styleUrls: ['./org-status-filter-carousel.component.scss'],
})
export class OrgStatusFilterCarouselComponent implements OnInit {
  @ViewChild('options') options!: ElementRef;
  @ViewChildren('item') elements!: QueryList<ElementRef>;

  @Input() items!: StatusFilterItem[];
  @Output() selectEmitter: EventEmitter<StatusFilterItem> =
    new EventEmitter<StatusFilterItem>();

  readonly eControlPosition = EControlPosition;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

  move(isNext: boolean): void {
    const item: number = this.elements.first?.nativeElement?.clientWidth;

    const carousel = this.options.nativeElement;

    carousel.scrollLeft = isNext
      ? carousel.scrollLeft + item + 150
      : carousel.scrollLeft - item - 150;
  }

  onSelect(item: StatusFilterItem, selectedIndex: number): void {
    this.items.forEach((item, index) => {
      item.isSelected = index === selectedIndex;
    });

    this.selectEmitter.emit(item);
  }
}
