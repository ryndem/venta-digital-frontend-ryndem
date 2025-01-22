import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service to manage app notifications
 * @export
 * @class NotificationService
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  /**
   * Creates an instance of NotificationService.
   * @param {ToastrService} toastr
   */
  constructor(private toastr: ToastrService) {}
  
  /**
   * Shows success notification
   * @param {string} message Notification message
   */
  async showSuccess(message: string) {
    console.log('SHOW SUCCESS ' + message)
    this.toastr.success(message);
  }

  /**
   * Shows error notification
   * @param {string} message Notification message
   */
  async showError(message: string) {
    console.log('SHOW ERROR ' + message);
    this.toastr.error(message);
  }
}
