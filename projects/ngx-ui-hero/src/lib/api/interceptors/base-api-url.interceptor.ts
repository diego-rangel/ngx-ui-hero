import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ApiSettings } from '../api.settings';
import { API_SETTINGS } from '../api.settings.constants';

@Injectable()
export class BaseApiUrlInterceptor implements HttpInterceptor {
    private _baseApiUrl: string;
    private _apiAlias: string;

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
    ){
        this._baseApiUrl = this.settings.apiBaseUrl;
        this._apiAlias = this.settings.apiAlias;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._baseApiUrl || this._baseApiUrl.length == 0) 
            return next.handle(req);

        let urlBase = this.concatUrl(this._baseApiUrl, this._apiAlias);

        const modified = req.clone({ 
            url: this.concatUrl(urlBase, req.url),
        });

        return next.handle(modified);
    }

    private concatUrl(path1: string, path2: string): string {
        let separator = !this.isNullOrEmpty(path1) && !this.isNullOrEmpty(path2) && !path1.endsWith('/') && !path2.startsWith('/')
            ? '/'
            : '';

        return `${path1}${separator}${path2}`;
    }
    private isNullOrEmpty(value: string): boolean {
        return value == undefined || value == null || value == '';
    }
}