import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsGroup } from './org-layout-search';
import { ClosableComponent } from 'app/components/commons/closable.component';

@Component({
  selector: 'org-layout-search',
  templateUrl: './org-layout-search.component.html',
  styleUrls: ['./org-layout-search.component.scss'],
})
export class LayoutSearchComponent extends ClosableComponent implements OnInit {

  @Input()
  optionsGroups: OptionsGroup[] = [];

  @Output()
  searchTermChange = new EventEmitter<string>();

  searchTerm = '';
  debounce: number | null = null;
  isSearching = false;
  isResultsVisible = false;
  private MIN_SEARCH_LENGHT = 3;
  
  constructor(private router: Router, private currentRoute: ActivatedRoute) {
    super();
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }
  ngOnInit(): void {
    this.isSearching = false;
    this.isResultsVisible = this.optionsGroups.length > 0;
  }

  override close() {
    this.isResultsVisible = false;
  }

  onEnter() {
    if(this.searchTerm?.length < this.MIN_SEARCH_LENGHT)
      return;

    this.router.navigate(['products'], {
      queryParams: {
        searchTerm: this.searchTerm,
        category: '',
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
    this.isResultsVisible = false;
  }

  onSearchTermChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    if (!value) {
      return;
    }
    if(value.length < this.MIN_SEARCH_LENGHT)
      return;

    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.isSearching = true;
      this.searchTermChange.emit(value);
    }, 400) as unknown as number;
  }

  onCloseSearch() {
    if (this.isResultsVisible ) {
      this.isResultsVisible = false;
    } else {
      this.searchTerm = '';

      if( this.router.url.startsWith('/products?') ) {
        this.router.navigate(['products'], {
          queryParams: {
            searchTerm: this.searchTerm,
            page: 1,
          },
          queryParamsHandling: 'merge',
        });
      }
      
    }
    

  }

  onFocusSearch() {
    this.isResultsVisible = this.optionsGroups.length > 0;
  }
}
