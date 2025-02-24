import { Component, EventEmitter, Output } from '@angular/core';
import { OrderFile } from 'app/model/order-file';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsFileUploading } from 'app/store/selectors/view.selectors';
import { uploadPurchaseOrderFile } from 'app/store/actions/order.actions';
import { selectUploadedOrderFile } from 'app/store/selectors/order.selectors';

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
   * Name of the file selected
   * @type {(string | null)}
   */
  fileName: string | null = null;

  /**
   * Store reference (view.isFileUploading)
   */
  isFileUploading$: Observable<boolean>;

  /**
   * Store reference (view.isFileUploading)
   */
  uploadedOrderFile$: Observable<OrderFile | null>;

  /**
   * Creates an instance of MolFileUploaderComponent.
   * @param {Store} store
   */
  constructor(
    private store: Store,
  ) {
    this.isFileUploading$ = this.store.select(selectIsFileUploading);
    this.uploadedOrderFile$ = this.store.select(selectUploadedOrderFile);
    this.uploadedOrderFile$.subscribe((newValue => {
      if (newValue) {
        this.fileUploadedEmitter.emit(newValue);
      }
    }));
    
  }
  /**
   * File selected event
   * @param {Event} event
   */
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileForm = new FormData();
      fileForm.append('file', input.files[0], input.files[0].name);
      this.store.dispatch(uploadPurchaseOrderFile({fileForm}));

      this.fileName = input.files[0].name;
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
