import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { CategoriesService } from 'app/services/categories.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoriesService.list();
    this.categories.forEach((category) => {
      this.categoriesService.setProperties(category);
    });
  }
}
