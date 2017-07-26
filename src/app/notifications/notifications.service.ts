import { Injectable } from '@angular/core';
import { ToastConfig, ToastrService, ToastrConfig } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NotificationsService {

  constructor(private toastrConfig: ToastrConfig, private toastrService: ToastrService) {
    this.toastrConfig.positionClass = 'toast-bottom-right';
  }

  success(message: string) {
    this.notify('toast-success', message);
  }

  warning(message: string) {
    this.notify('toast-warning', message);
  }

  error(message: string) {
    this.notify('toast-error', message);
  }

  private notify(type: string, message: string, options?: ToastConfig) {
    this.toastrService.show(message, undefined, options, type);
  }

}
