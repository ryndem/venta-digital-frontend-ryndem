import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
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

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentRoute.queryParams.subscribe((params) => {
      this.currentPage = parseInt(params['page']) || 1;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let totalResults: SimpleChange = changes['totalResults'];
    if (totalResults) {
      this.totalResults = totalResults.currentValue;
      if (this.totalResults > 0) {
        this.totalPages = Math.ceil(this.totalResults / 30);
      }
    }
  }

  setPage(page: number) {
    this.currentPage = page;

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  goToNextPage(): void {
    if (this.currentPage + 1 >= this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.currentPage += 1;
    }
    this.setPage(this.currentPage);
  }

  goToPreviousPage(): void {
    if (this.currentPage - 1 <= 1) {
      this.currentPage = 1;
    } else {
      this.currentPage -= 1;
    }

    this.setPage(this.currentPage);
  }
}
