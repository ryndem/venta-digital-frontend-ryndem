import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrderFile } from 'app/model/order-file';

/**
 * Service to manage file upload to API
 * @export
 * @class FileService
 */
@Injectable({
  providedIn: 'root',
})
export class FileService {

  /**
   * API base path for the file requests
   */
  private apiPath: string = environment.apiUrl;

  
  /**
   * File bucket to store uploaded file
   */
  private fileBucket: string = environment.fileBucket;



  /**
   * Creates an instance of FileService.
   * @param {HttpClient} httpClient
   */
  constructor(
    private httpClient: HttpClient
  ) {}

  
  /**
   * Uploads file to API
   *
   * @param {FormData} formData File form to update to API
   * @return {Promise<OrderFile>} 
   */
  async uploadFile (formData: FormData) {
    return firstValueFrom(this.httpClient.post<OrderFile>(this.apiPath+ '/FileUpload/' + this.fileBucket, formData));
  }


}
