import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta, private title: Title) { }

  updateMetaTagsAndTitle(pageTitle: string, tags: { [key: string]: string }[]) {
    this.title.setTitle(pageTitle);

    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }
}
