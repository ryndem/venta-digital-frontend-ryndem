import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from 'app/services/file.service';
import { OrderFile } from 'app/model/order-file';

@Component({
  selector: 'mol-file-uploader',
  templateUrl: './mol-file-uploader.component.html',
  styleUrls: ['./mol-file-uploader.component.scss']
})
export class MolFileUploaderComponent {

  @Output()
  fileUploadedEmitter = new EventEmitter<OrderFile>();

  @Output()
  fileRemovedEmitter = new EventEmitter<void>();

  isUploading = false;
  fileName: string | null = null;

  constructor(
    private fileService: FileService,
  ) {}

  get fileUploadSuccess() {
    return !this.isUploading && this.fileName;
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isUploading = true;
      const formData = new FormData();
      this.fileName = input.files[0].name;
      formData.append('file', input.files[0], input.files[0].name);

      const response = await this.fileService.uploadFile(formData);
      this.fileUploadedEmitter.emit(response);
      this.isUploading = false;
    }
  }

  onFileDeleted() {
    this.fileName = null;
    this.fileRemovedEmitter.emit();
  }
}
