import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'atm-file-downloader',
  templateUrl: './atm-file-downloader.component.html',
  styleUrl: './atm-file-downloader.component.scss'
})
export class AtmFileDownloaderComponent {
  @Input()
  fileName: string = '';

  @Input()
  fileId: string = '';

  private apiPath: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

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
      this.notificationService.showError("Error trying to download file.")
    });
  }
}
