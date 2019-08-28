import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ApiSettings } from '../api.settings';
import { API_SETTINGS } from '../api.settings.constants';
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
    private _jwtSuffix: string = 'access_token';

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
        private localStorageService: LocalStorageService
    ){
        if (this.settings.jwtLocalStorageSuffix) {
            this._jwtSuffix = this.settings.jwtLocalStorageSuffix
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwtToken: string = this.localStorageService.Get(this._jwtSuffix);

        if (!jwtToken || jwtToken.length == 0) 
            return next.handle(req);

        const modified = req.clone({ 
            setHeaders: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        });

        return next.handle(modified);
    }
}