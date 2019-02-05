import Swal, { SweetAlertType } from 'sweetalert2';

import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    constructor() { }

    private show(title: string, text: string, type: SweetAlertType, confirmButtonText?: string, callback?: Function): any {
        Swal({
            title: title,
            html: text,
            type: type,
            confirmButtonText: confirmButtonText || 'Ok'
        }).then((result) => {
            if (result.value && callback) {
                callback();
            }
        });
    }

    info(title: string, text: string, confirmButtonText?: string, callback?: Function): any {
        this.show(title, text, 'info', confirmButtonText, callback);
    }
    success(title: string, text: string, confirmButtonText?: string, callback?: Function): any {
        this.show(title, text, 'success', confirmButtonText, callback);
    }
    error(title: string, text: string, confirmButtonText?: string, callback?: Function): any {
        this.show(title, text, 'error', confirmButtonText, callback);
    }
    warning(title: string, text: string, confirmButtonText?: string, callback?: Function): any {
        this.show(title, text, 'warning', confirmButtonText, callback);
    }
    question(title: string, text: string, successCallback: Function, confirmButtonText?: string, cancelButtonText?: string, cancelCallback?: Function): any {
        Swal({
            title: title,
            text: text,
            type: 'question',
            confirmButtonText: confirmButtonText || 'Ok',
            cancelButtonText: cancelButtonText || 'Cancel',
            showCancelButton: true
        }).then((result) => {
            if (result.value && successCallback) {
                successCallback();
            } else if (!result.value && cancelCallback) {
                cancelCallback();
            }
          });
    }
}
