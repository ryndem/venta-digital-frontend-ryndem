import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsGroup } from './org-layout-search';

@Component({
  selector: 'org-layout-search',
  templateUrl: './org-layout-search.component.html',
  styleUrl: './org-layout-search.component.scss'
})
export class LayoutSearchComponent {

  optionsGroups: OptionsGroup[] = [];

  @Output()
  searchTermChange = new EventEmitter<string>();

  searchTerm: string = '';

  debounce: number | null = null;

  isSearching: boolean = false;

  isResultsVisible: boolean = false;

  @Input('optionsGroups')
  set updateOptionsGroups(optionsGroups: OptionsGroup[]) {
    this.optionsGroups = optionsGroups;
    this.isSearching = false;
    this.isResultsVisible = true;
  }

  constructor(private router: Router) {}

  onEnter() {
    this.router.navigate(['products'], {
      queryParams: {
        searchTerm: this.searchTerm,
        category: '',
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  onSearchTermChange(event: Event) {

    const {value} = event.target as HTMLInputElement;

    if (!value) {
      return;
    }

    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.isSearching = true;
      this.searchTermChange.emit(value);
    }, 400) as unknown as number;

  }

  onCloseSearch() {
    this.isResultsVisible = false;
  }

  onFocusSearch() {
    this.isResultsVisible = this.optionsGroups.length > 0;
  }

}
