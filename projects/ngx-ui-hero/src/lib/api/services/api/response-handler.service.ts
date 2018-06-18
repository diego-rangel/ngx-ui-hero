import { Injectable, Inject } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { Observable, throwError } from 'rxjs';

import { ApiSettings } from '../../api.settings';
import { API_SETTINGS } from '../../api.settings.constants';

@Injectable()
export class ResponseHandlerService {

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings
    ) { }

    handleSuccess(response: Response, responseType: ResponseContentType): any {
        switch (responseType) {
            case ResponseContentType.Json:
                return response.json();
            case ResponseContentType.Blob:
                return response.blob();
            default:
                return response.text();
        }
    }
    handleError(response: Response): Observable<any> {
        let error: any;

        if (response.status == 401) {
            error = {
                unauthorized: true
            };
        } else if (response.status === 400 || response.status === 404) {
            const responseBody = response.text();

            if (responseBody) {
                error = {
                    message: responseBody
                };
            } else {
                error = this.getDefaultErrorObject();
            }
        } else {
            error = this.getDefaultErrorObject();
        }

        return throwError(error);
    }

    private getDefaultErrorObject(): any {
        return {
            unauthorized: false,
            title: this.settings.errorHandlingSettings.unhandledErrorTitle,
            message: this.settings.errorHandlingSettings.unhandledErrorMessage
        };
    }
}
