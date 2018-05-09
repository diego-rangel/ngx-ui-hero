// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Injectable, Inject } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_SETTINGS } from '../../api.settings.constants';
import { ApiSettings } from '../../api.settings';

@Injectable()
export class ResponseHandlerService {

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings
    ) { }

    // handleSuccess(response: Response, responseContentType?: ResponseContentType): any {
    //     let responseType = ResponseContentType.Json;

    //     if (responseContentType !== null && responseContentType !== responseType) {
    //         responseType = responseContentType;
    //     }

    //     switch (responseType) {
    //         case ResponseContentType.ArrayBuffer:
    //             return response.arrayBuffer();
    //         case ResponseContentType.Blob:
    //             return response.blob();
    //         case ResponseContentType.Text:
    //             return response.text();
    //         default:
    //             return response.json();
    //     }
    // }
    // handleError(response: Response): ErrorObservable {
    //     let error: any;

    //     if (response.status === 400) {
    //         const responseBody = response.json();

    //         if (responseBody.error instanceof Object) {
    //             error = responseBody.error;
    //         } else if (responseBody.error && responseBody.error_description) {
    //             error = {
    //                 title: responseBody.error,
    //                 message: responseBody.error_description
    //             };
    //         } else {
    //             error = this.getDefaultErrorObject();
    //         }
    //     } else {
    //         error = this.getDefaultErrorObject();
    //     }

    //     const e = Observable.throw(error);
    //     return null;
    // }

    // private getDefaultErrorObject(): any {
    //     return {
    //         title: this.settings.errorHandlingSettings.unhandledErrorTitle,
    //         message: this.settings.errorHandlingSettings.unhandledErrorMessage
    //     };
    // }

}
