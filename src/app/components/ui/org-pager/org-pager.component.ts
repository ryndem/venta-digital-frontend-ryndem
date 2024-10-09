import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'org-pager',
  templateUrl: './org-pager.component.html',
  styleUrl: './org-pager.component.scss'
})
export class OrgPagerComponent implements OnInit {

  @Input()
  totalResults: number = 0; 

  totalPages = 0;
  currentPage: number = 1;

  constructor(private router: Router, private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRoute.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page']) || 1;
    });
  }

  


  setPage(page: number) {
    console.log('ALGO - ', this.totalResults);
    this.currentPage = page;

    this.router.navigate([], {
      relativeTo: this.currentRoute,
      queryParams: {page},
      queryParamsHandling: 'merge'
    })

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
