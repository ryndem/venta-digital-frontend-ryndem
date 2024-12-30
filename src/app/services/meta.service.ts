import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Service to manage SEO Meta tags
 * @export
 * @class MetaService
 */
@Injectable({
  providedIn: 'root',
})
export class MetaService {

  /**
   * Creates an instance of MetaService.
   * @param {Meta} meta
   * @param {Title} title
   */
  constructor(private meta: Meta, private title: Title) { }


  
  /**
   * Method to update page title and tags
   * @param {string} pageTitle Title to set to the page
   * @param {{ [key: string]: string }[]} tags Tag map to update 
   */
  updateMetaTagsAndTitle(pageTitle: string, tags: { [key: string]: string }[]) {
    this.title.setTitle(pageTitle);

    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }
}
