import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { OptionsGroup } from 'app/model-props/options-group';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsProductSearchActive } from 'app/store/selectors/view.selectors';
import { updateIsProductSearchActive } from 'app/store/actions/view.actions';
import { searchProducts } from 'app/store/actions/product.actions';
import { selectSearchResults } from 'app/store/selectors/product.selectors';

/**
 * Header search component
 * @export
 * @class OrgLayoutSearchComponent
 * @extends {AtmClosableComponent}
 */
@Component({
  selector: 'org-layout-search',
  templateUrl: './org-layout-search.component.html',
  styleUrls: ['./org-layout-search.component.scss'],
})
export class OrgLayoutSearchComponent extends AtmClosableComponent {

  /**
   * Search term to filter results
   */
  searchTerm = '';

  /**
   * Debounce id reference
   * @type {(number | null)}
   */
  debounce: number | null = null;

  /**
   * Boolean to track drop down result display
   */
  isResultsVisible = false;

  isProductSearchActive$: Observable<boolean>;
  searchResults$: Observable<OptionsGroup[]>;

  /**
   * Minimum characters to search
   * @private
   */
  private MIN_SEARCH_LENGHT = 3;


  /**
   * Creates an instance of OrgLayoutSearchComponent.
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   */
  constructor(
      private router: Router,
      private currentRoute: ActivatedRoute,
      private store: Store,
    ) {
    super();
    this.isProductSearchActive$ = this.store.select(selectIsProductSearchActive);
    this.searchResults$ = this.store.select(selectSearchResults);
    
    this.currentRoute.queryParams.subscribe((params) => {
      if (params['searchTerm'] != this.searchTerm) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  /**
   * Method overrided to close dropdown component
   */
  override close() {
    this.isResultsVisible = false;
  }


  /**
   * Listener for enter key
   * @return {*} 
   */
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
    if (this.debounce) {
      clearTimeout(this.debounce);
    }
  }

  /**
   * Listener for search term change
   * @param {Event} event
   * @return {*} 
   */
  onSearchTermChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    if (!value) {
      this.isResultsVisible = false;
      return;
    }
    if(value.length < this.MIN_SEARCH_LENGHT)
      return;

    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(() => {
      this.searchProducts(value);
    }, 400) as unknown as number;
  }

  /**
   * Method to handle product search
   * @param {string} term
   */
  async searchProducts(term: string) {
    this.store.dispatch(updateIsProductSearchActive({ isProductSearchActive: true}));
    this.store.dispatch(searchProducts({ searchTerm: term}));

    this.isResultsVisible = true;
  }

  /**
   * Listener for close search component
   */
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

  /**
   * Listener for search component focus
   */
  onFocusSearch() {
    //this.isResultsVisible = this.optionsGroups.length > 0;
  }
}