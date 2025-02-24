import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/model/category';
import { CategoryInfo } from 'app/model/category-info';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

/**
 * Service to manage categories API calls
 * @export
 * @class CategoriesService
 */
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  
  /**
   * API base path for the categories requests
   */
  private apiPath: string = environment.apiUrl + '/ProductCategory';


  /**
   * Creates an instance of CategoriesService.
   * @param {HttpClient} httpClient
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Loads category list from API
   * @return {Promise<Category[]>}
   */
  async list(): Promise<Category[]> {
    return firstValueFrom(this.httpClient.get<Category[]>(this.apiPath));
  }

  /**
   * Update image properties to category object
   * @param {Category} category Category to update description and icon
   */
  setProperties(category: Category) {
    const descriptions: CategoryInfo = {
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
    const icons: CategoryInfo = {
      standards: 'assets/imgs/categories/standards.svg',
      reagents: 'assets/imgs/categories/reactive.svg',
      controlled: 'assets/imgs/categories/lock.svg',
      microbiology: 'assets/imgs/categories/microscope.svg',
      publications: 'assets/imgs/categories/book.svg',
      training: 'assets/imgs/categories/trainings.svg',
      labware: 'assets/imgs/categories/filtros-y-columnas.svg',
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
