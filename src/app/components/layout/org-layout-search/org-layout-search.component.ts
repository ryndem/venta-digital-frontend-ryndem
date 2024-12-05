import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmClosableComponent } from 'app/components/commons/atm-closable/atm-closable.component';
import { OptionsGroup } from 'app/model-props/options-group';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'org-layout-search',
  templateUrl: './org-layout-search.component.html',
  styleUrls: ['./org-layout-search.component.scss'],
})
export class LayoutSearchComponent extends AtmClosableComponent {

  optionsGroups: OptionsGroup[] = [];

  searchTerm = '';
  debounce: number | null = null;
  isSearching = false;
  isResultsVisible = false;
  private MIN_SEARCH_LENGHT = 3;

  constructor(
      private productService: ProductsService,
      private router: Router,
      private currentRoute: ActivatedRoute) {
    super();

    this.currentRoute.queryParams.subscribe((params) => {
      if (params['searchTerm'] != this.searchTerm) {
        this.searchTerm = params['searchTerm'];
      }
    });
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
    if (this.debounce) {
      clearTimeout(this.debounce);
    }
  }

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

  async searchProducts(term: string) {
    this.isSearching = true;
    const result = await this.productService.searchProducts(term);
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
