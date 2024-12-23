import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { OrderFile } from 'app/model/order-file';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private apiPath: string = environment.apiUrl;
  private fileBucket: string = environment.fileBucket;

  constructor(
    private httpClient: HttpClient
  ) {}

  async uploadFile (formData: FormData) {
    return firstValueFrom(this.httpClient.post<OrderFile>(this.apiPath+ '/FileUpload/' + this.fileBucket, formData));
  }


}
