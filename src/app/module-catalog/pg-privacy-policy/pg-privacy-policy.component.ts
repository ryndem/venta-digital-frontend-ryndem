import { Component } from '@angular/core';
import { MetaService } from 'app/services/meta.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'pg-privacy-policy',
  templateUrl: './pg-privacy-policy.component.html',
  styleUrls: ['./pg-privacy-policy.component.scss'],
})
export class PgPrivacyPolicyComponent {
  constructor(private metaService: MetaService) {
    this.setMetaTags();
  }

  setMetaTags() {
    this.metaService.updateMetaTagsAndTitle(
      'Aviso de Privacidad - Proquifa',
      [
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
    );
  }
}
