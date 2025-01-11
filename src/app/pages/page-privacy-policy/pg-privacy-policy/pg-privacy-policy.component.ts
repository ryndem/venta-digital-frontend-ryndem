import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateMetaTagsAndTitle } from 'app/store/actions/view.actions';
import { ViewState } from 'app/store/states/view.state';
import { environment } from 'environments/environment';

/**
 * Page component to show privacy policy
 * @export
 * @class PgPrivacyPolicyComponent
 */
@Component({
  selector: 'pg-privacy-policy',
  templateUrl: './pg-privacy-policy.component.html',
  styleUrls: ['./pg-privacy-policy.component.scss'],
})
export class PgPrivacyPolicyComponent {

  /**
   * Creates an instance of PgPrivacyPolicyComponent.
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
      pageTitle: 'Aviso de Privacidad - Proquifa', 
      tags: [
        {
          name: 'description',
          content: 'Consulta nuestro Aviso de Privacidad en Proquifa. Conoce cómo protegemos tus datos personales y garantizamos la seguridad de tu información.',
        },
        {
          name: 'keywords',
          content: 'aviso de Privacidad, protección de datos, seguridad de información, privacidad, Proquifa',
        },
        {
          property: 'og:title',
          content: 'Aviso de Privacidad - Proquifa',
        },
        {
          property: 'og:description',
          content: 'Revisa el Aviso de Privacidad de Proquifa y conoce cómo gestionamos y protegemos tus datos personales.',
        },
        {
          property: 'og:url',
          content: `${environment.baseUrl}/privacy-policy`,
        },
        {
          name: 'twitter:title',
          content: 'Aviso de Privacidad - Proquifa',
        },
        {
          name: 'twitter:description',
          content: 'Consulta nuestro Aviso de Privacidad para saber cómo protegemos tus datos personales y garantizamos tu seguridad en Proquifa.',
        },
        {
          property: 'twitter:url',
          content: `${environment.baseUrl}/privacy-policy`,
        },
      ]
    }));
  }
}
