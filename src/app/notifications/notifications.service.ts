import { Injectable } from '@angular/core';
import { ToastConfig, ToastrService, ToastrConfig } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';

enum NotificationType {
  success = 'toast-success',
  info = 'toast-info',
  warning = 'toast-warning',
  error = 'toast-error'
}

@Injectable()
export class NotificationsService {

  constructor(private toastrConfig: ToastrConfig, private toastrService: ToastrService) {
    this.toastrConfig.positionClass = 'toast-bottom-right';
  }

  success(message: string) {
    this.notify(NotificationType.success, message);
  }

  warning(message: string) {
    this.notify(NotificationType.warning, message);
  }

  error(message: string) {
    this.notify(NotificationType.error, message);
  }

  private notify(type: NotificationType, message: string, options?: ToastConfig) {
    this.toastrService.show(message, undefined, options, type.toString());
  }

}
