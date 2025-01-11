import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { ShoppingCartState } from 'app/store/states/cart.state';
import { Store } from '@ngrx/store';
import { showErrorNotification } from 'app/store/actions/view.actions';

/**
 * Component to download file by id
 * @export
 * @class MolFileDownloaderComponent
 */
@Component({
  selector: 'mol-file-downloader',
  templateUrl: './mol-file-downloader.component.html',
  styleUrls: ['./mol-file-downloader.component.scss']
})
export class MolFileDownloaderComponent {
  
  /**
   * File name of the file to download
   */
  @Input() fileName = '';

  /**
   * Id of the file to download
   */
  @Input() fileId = '';

  /**
   * API base path
   * @private
   * @type {string}
   */
  private apiPath: string = environment.apiUrl;

  /**
   * Creates an instance of MolFileDownloaderComponent.
   * @param {HttpClient} http
   * @param {Store<{ ShoppingCartState }>} store
   */
  constructor(
    private http: HttpClient,
    private store: Store<ShoppingCartState>,
  ) {}

  /**
   * Method to download file
   */
  downloadFile() {
    const downloadUrl = `${this.apiPath}/FileDownload/${this.fileId}`;

    this.http.get(downloadUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, () => {
      this.store.dispatch(showErrorNotification({ message: 'Error trying to download file.'}));
    });
  }
}
