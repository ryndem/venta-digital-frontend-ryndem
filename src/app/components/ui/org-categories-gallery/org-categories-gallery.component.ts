import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'org-categories-gallery',
  templateUrl: './org-categories-gallery.component.html',
  styleUrl: './org-categories-gallery.component.scss'
})
export class OrgCategoriesGalleryComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) {}

  @Input()
  categories: Category[] = [];

  @Input()
  isOnlyCategories: boolean = false;

  async ngOnInit(): Promise<void> {
      
    this.categories = await this.categoriesService.list();
    this.categories.forEach(category => {
      this.categoriesService.setProperties(category);
    });

  }

}
