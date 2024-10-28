import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from 'app/model/quote';
import { QuotesService } from 'app/services/quotes.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrl: './quotes-page.component.scss',
})
export class QuotesPageComponent implements OnInit {
  tabs: any[] = [];
  tab: any = {};
  quotes: Quote[] | null = null;
  q: string = '';
  isAuthenticated$: Observable<boolean>;

  constructor(
    private quoteService: QuotesService,
    public authService: AuthService,
    private store: Store<{ user: { isLogged: boolean } }>,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select('user').pipe(map(user => user.isLogged));

    this.tabs = [
      {
        key: 'quotes',
        title: 'Cotizaciones',
        emptyMessage: 'No tienes cotizaciones vigentes.'
      },
      {
        key: 'in-progress',
        title: 'Pedidos en Proceso',
        emptyMessage: 'No tienes órdenes de compra.'
      },
      {
        key: 'confirmed',
        title: 'Pedidos Confirmados',
        emptyMessage: 'No tienes pedidos.'
      },
    ]
    this.tab = this.tabs[0];
  }

  async ngOnInit() {

    await this.authService.loadSession();
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.loadQuotes();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  updateTab(tabKey: string) {
    this.tab = this.tabs.find(t => t.key == tabKey);
    this.q = '';
    this.loadQuotes();
  }

  async loadQuotes() {
    if( this.tab.key == 'quotes' ) {
      let page = await this.quoteService.getQuotes(this.q);
      this.quotes = page.results;
    }

    if( this.tab.key == 'in-progress' ) {
      this.quotes = [];
    }

    if( this.tab.key == 'confirmed' ) {
      this.quotes = [];
    }
  }
}
