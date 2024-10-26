import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'org-pager',
  templateUrl: './org-pager.component.html',
  styleUrl: './org-pager.component.scss',
})
export class OrgPagerComponent implements OnInit, OnChanges {
  @Input()
  totalResults: number = 0;

  totalPages = 0;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  visiblePages = 3;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentRoute.queryParams.subscribe((params) => {
      this.currentPage = parseInt(params['page']) || 1;
      this.updatePageNumbers();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalResults']) {
      this.totalResults = changes['totalResults'].currentValue;
      this.totalPages = Math.ceil(this.totalResults / 30);
      this.updatePageNumbers();
    }
  }

  updatePageNumbers() {
    this.pageNumbers = [];

    const half = Math.floor(this.visiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, this.currentPage + half);

    // Adjust if near the start or end
    if (this.currentPage <= half) {
      end = Math.min(this.totalPages, this.visiblePages);
    } else if (this.currentPage + half >= this.totalPages) {
      start = Math.max(1, this.totalPages - this.visiblePages + 1);
    }

    // Always add the first page if not in the visible range
    if (start > 1) {
      this.pageNumbers.push(1);
      if (start > 2) this.pageNumbers.push(-1);
    }

    // Add the current visible page range
    for (let i = start; i <= end; i++) {
      this.pageNumbers.push(i);
    }

    // Add ellipsis and the last page if not in the visible range
    if (end < this.totalPages) {
      if (end < this.totalPages - 1) this.pageNumbers.push(-1);
      this.pageNumbers.push(this.totalPages);
    }
  }

  setPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;

      this.router.navigate([], {
        relativeTo: this.currentRoute,
        queryParams: { page },
        queryParamsHandling: 'merge',
      });
      this.updatePageNumbers();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  jumpForward() {
    const newPage = Math.min(this.currentPage + this.visiblePages, this.totalPages - this.visiblePages + 1);
    this.setPage(newPage);
  }

  jumpBackward() {
    const newPage = Math.max(this.currentPage - this.visiblePages, 1);
    this.setPage(newPage);
  }
}
