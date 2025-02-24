import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrderFile } from 'app/model/order-file';
import { Store } from '@ngrx/store';
import { updateIsFileUploading } from 'app/store/actions/view.actions';
import { updateUploadedOrderFile } from 'app/store/actions/order.actions';

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
    private httpClient: HttpClient,
    private store: Store,
  ) {}

  
  /**
   * Uploads file to API
   *
   * @param {FormData} formData File form to update to API
   * @return {Promise<OrderFile>} 
   */
  async uploadFile (formData: FormData) {
    try {
      this.store.dispatch(updateIsFileUploading({ isFileUploading: true }))
      const orderFile = await firstValueFrom(this.httpClient.post<OrderFile>(this.apiPath+ '/FileUpload/' + this.fileBucket, formData));
      this.store.dispatch(updateUploadedOrderFile({orderFile: orderFile}));

    } catch(error) {
      this.store.dispatch(updateUploadedOrderFile({orderFile: null}));
      console.error('ERROR', error)
    } finally {
      this.store.dispatch(updateIsFileUploading({ isFileUploading: false }))
    }
  }


}
