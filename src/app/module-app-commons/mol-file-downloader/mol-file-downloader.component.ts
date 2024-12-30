import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NotificationService } from 'app/services/notification.service';

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
   * @param {NotificationService} notificationService
   */
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
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
    }, (error) => {
      console.error(error);
      this.notificationService.showError("Error trying to download file.")
    });
  }
}
