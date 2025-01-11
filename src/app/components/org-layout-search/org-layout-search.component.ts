import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmClosableComponent } from 'app/module-app-commons/atm-closable/atm-closable.component';
import { OptionsGroup } from 'app/model-props/options-group';
import { ProductsService } from 'app/services/products.service';

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
   * Collection to group search result by category
   * @type {OptionsGroup[]}
   */
  optionsGroups: OptionsGroup[] = [];

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
   * Boolean to track loading state at search
   */
  isSearching = false;


  /**
   * Boolean to track drop down result display
   */
  isResultsVisible = false;


  /**
   * Minimum characters to search
   * @private
   */
  private MIN_SEARCH_LENGHT = 3;

  /**
   * Creates an instance of OrgLayoutSearchComponent.
   * @param {ProductsService} productSservice
   * @param {Router} router
   * @param {ActivatedRoute} currentRoute
   */
  constructor(
      private productsService: ProductsService,
      private router: Router,
      private currentRoute: ActivatedRoute) {
    super();

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
    this.isSearching = true;
    const result = await this.productsService.searchProducts(term);
    const items = result.map((r) => {
      return { label: r.description, value: r.idProducto };
    });
    this.optionsGroups = [];

    this.optionsGroups.push({
      title: 'Resultados',
      items: items,
    });
    this.isResultsVisible = true;
    this.isSearching = false;
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
    this.isResultsVisible = this.optionsGroups.length > 0;
  }
}
