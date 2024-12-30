import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component to paginate lists
 * @export
 * @class OrgPagerComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'org-pager',
  templateUrl: './org-pager.component.html',
  styleUrls: ['./org-pager.component.scss'],
})
export class OrgPagerComponent implements OnInit, OnChanges {
  
  /**
   * Total results of the request
   */
  @Input() totalResults = 0;

  /**
   * Page size
   */
  @Input() pageSize = 0;

   
  /**
   * total pages calculates
   */
  totalPages = 0;

  
  /**
   * Current selected page 
   */
  currentPage = 1;

  /**
   * All page number available
   * @type {number[]}
   */
  pageNumbers: number[] = [];

  
  /**
   * Number of pages to show 
   */
  visiblePages = 3;

  /**
   * Creates an instance of OrgPagerComponent.
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   */
  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.currentRoute.queryParams.subscribe((params) => {
      this.currentPage = parseInt(params['page']) || 1;
      this.updatePageNumbers();
    });
  }

  /**
   * Listens changes on input values
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalResults']) {
      this.totalResults = changes['totalResults'].currentValue;
      this.totalPages = Math.ceil(this.totalResults / this.pageSize);
      this.updatePageNumbers();
    }
  }

  /**
   * Updates available pages
   */
  updatePageNumbers() {
    this.pageNumbers = [];

    const half = Math.floor(this.visiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, this.currentPage + half);

    if (this.currentPage <= half) {
      end = Math.min(this.totalPages, this.visiblePages);
    } else if (this.currentPage + half >= this.totalPages) {
      start = Math.max(1, this.totalPages - this.visiblePages + 1);
    }

    if (start > 1) {
      this.pageNumbers.push(1);
      if (start > 2) this.pageNumbers.push(-1);
    }

    for (let i = start; i <= end; i++) {
      this.pageNumbers.push(i);
    }

    if (end < this.totalPages) {
      if (end < this.totalPages - 1) this.pageNumbers.push(-1);
      this.pageNumbers.push(this.totalPages);
    }
  }

  /**
   * Method to handle page number update
   * @param {number} page
   */
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

  /**
   * Method to handle next page action
   */
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  /**
   * Method to handle precious page
   */
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  /**
   * Method to handle jump page forward
   */
  jumpForward() {
    const newPage = Math.min(this.currentPage + this.visiblePages, this.totalPages - this.visiblePages + 1);
    this.setPage(newPage);
  }

  /**
   * Method to handle jump page backward
   */
  jumpBackward() {
    const newPage = Math.max(this.currentPage - this.visiblePages, 1);
    this.setPage(newPage);
  }
}
