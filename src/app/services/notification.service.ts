import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  TOASTR_CONF: any = {
    positionClass: 'toast-top-center'
  };

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showWarning(message: string) {
    this.toastr.warning(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
