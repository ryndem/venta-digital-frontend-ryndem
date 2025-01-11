import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { ViewState } from 'app/store/states/view.state';
import { environment } from 'environments/environment';

/**
 * Page component to display terms and conditions
 * @export
 * @class PgTermsAndConditionsComponent
 */
@Component({
  selector: 'pg-terms-and-conditions',
  templateUrl: './pg-terms-and-conditions.component.html',
  styleUrls: ['./pg-terms-and-conditions.component.scss'],
})
export class PgTermsAndConditionsComponent {


  /**
   * Creates an instance of PgTermsAndConditionsComponent.
   * @param {Store<ViewState>} store
   */
  constructor(
    private store: Store<ViewState>,
  ) {
    this.setMetaTags();
  }

  /**
   * Updates page meta tags
   */
  setMetaTags() {
    this.store.dispatch(updateMetaTagsAndTitle({
      pageTitle: 'Términos y Condiciones - Proquifa', 
      tags: [
        {
          name: 'description',
          content: 'Consulta los términos y condiciones de uso de Proquifa. Infórmate sobre nuestras políticas, responsabilidades y derechos para garantizar una experiencia segura.',
        },
        {
          name: 'keywords',
          content: 'términos y condiciones, políticas de uso, responsabilidades, derechos, Proquifa, políticas de privacidad',
        },
        {
          property: 'og:title',
          content: 'Términos y Condiciones - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Revisa los términos y condiciones de uso de Proquifa y conoce nuestras políticas para garantizar una experiencia confiable.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/terms-and-conditions`,
        },
        {
          name: 'twitter:title',
          content: 'Términos y Condiciones - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Consulta las políticas de uso y los términos y condiciones de Proquifa para garantizar una experiencia segura y transparente.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/terms-and-conditions`,
        },
      ]
    }));
  }
}
