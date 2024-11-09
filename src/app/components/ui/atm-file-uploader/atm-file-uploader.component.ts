import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from 'app/services/file.service';
import { OrderFile } from 'app/model/order-file';

@Component({
  selector: 'atm-file-uploader',
  templateUrl: './atm-file-uploader.component.html',
  styleUrl: './atm-file-uploader.component.scss'
})
export class AtmFileUploaderComponent {

  @Output()
  onFileUploadEmitter = new EventEmitter<OrderFile>();

  isUploading: boolean = false;
  fileName: string|null = null;
  
  constructor(
    private fileService: FileService,
  ) {}

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isUploading = true;
      const formData = new FormData();
      this.fileName = input.files[0].name;
      formData.append('file', input.files[0], input.files[0].name);

      let response = await this.fileService.uploadFile(formData);
      this.onFileUploadEmitter.emit(response);
      this.isUploading = false;
    }
  }
}
