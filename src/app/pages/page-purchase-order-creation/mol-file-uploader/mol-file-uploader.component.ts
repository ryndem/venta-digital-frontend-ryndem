import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from 'app/services/file.service';
import { OrderFile } from 'app/model/order-file';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsFileUploading } from 'app/store/selectors/view.selectors';

/**
 * Component to upload file to the API
 * @export
 * @class MolFileUploaderComponent
 */
@Component({
  selector: 'mol-file-uploader',
  templateUrl: './mol-file-uploader.component.html',
  styleUrls: ['./mol-file-uploader.component.scss']
})
export class MolFileUploaderComponent {

  /**
   * File uploaded event emitter
   */
  @Output() fileUploadedEmitter = new EventEmitter<OrderFile>();

  /**
   * File removed event emitter
   */
  @Output() fileRemovedEmitter = new EventEmitter<void>();

  /**
   * Flag to indicate if the file is uploading
   */
  isUploading = false;

  /**
   * Name of the file selected
   * @type {(string | null)}
   */
  fileName: string | null = null;

  /**
   * Store reference (view.isFileUploading)
   */
    isFileUploading$: Observable<boolean>;

  /**
   * Creates an instance of MolFileUploaderComponent.
   * @param {FileService} fileService
   */
  constructor(
    private fileService: FileService,
    private store: Store,
  ) {
    this.isFileUploading$ = this.store.select(selectIsFileUploading);
  }

  /**
   * File upload sucess event
   * @readonly
   */
  get fileUploadSuccess() {
    return !this.isUploading && this.fileName;
  }

  /**
   * File selected event
   * @param {Event} event
   */
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

  /**
   * File delete method
   */
  onFileDeleted() {
    this.fileName = null;
    this.fileRemovedEmitter.emit();
  }
}
