import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ApiSettings } from '../api.settings';
import { API_SETTINGS } from '../api.settings.constants';

@Injectable()
export class BaseApiUrlInterceptor implements HttpInterceptor {
    private _baseApiUrl: string;

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
    ){
        this._baseApiUrl = this.settings.apiBaseUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._baseApiUrl || this._baseApiUrl.length == 0) 
            return next.handle(req);

        const modified = req.clone({ 
            url: `${this._baseApiUrl}${req.url}`,
        });

        return next.handle(modified);
    }
}