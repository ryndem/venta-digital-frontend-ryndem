import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/model/category';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiPath: string = environment.apiUrl + '/ProductCategory';
  categories: Category[] | null = null;

  constructor(private httpClient: HttpClient) {}

  async list(): Promise<Category[]> {
    return firstValueFrom(this.httpClient.get<Category[]>(this.apiPath));
  }

  setProperties(category: Category) {
    const descriptions: any = {
      standards:
        'Referencias analíticas para resultados confiables y precisos.',
      reagents: 'Pureza garantizada para resultados exactos.',
      controlled: 'Manejo seguro y regulado de sustancias.',
      microbiology:
        'Amplio portafolio de cepas para control de calidad microbiológico.',
      publications: 'Actualizaciones normativas y técnicas especializadas.',
      training: 'Programas de formación continua especializada.',
      labware: 'Maneja muestras y datos asociados de manera eficiente.',
      default: '-',
    };
    const icons: any = {
      standards: 'assets/icons/category-standards.svg',
      reagents: 'assets/icons/category-reactive.svg',
      controlled: 'assets/icons/category-lock.svg',
      microbiology: 'assets/icons/category-microscope.svg',
      publications: 'assets/icons/category-book.svg',
      training: 'assets/icons/category-trainings.svg',
      labware: 'assets/icons/category-filtros-y-columnas.svg',
      default: 'assets/icons/no-image.svg',
    };

    const catKey = category.key || '';
    const keyDescriptions: string = catKey in descriptions ? catKey : 'default';
    const keyIcons: string = catKey in icons ? catKey : 'default';

    category.label = category.description;
    category.description = descriptions[keyDescriptions];
    category.iconPath = icons[keyIcons];
  }
}
