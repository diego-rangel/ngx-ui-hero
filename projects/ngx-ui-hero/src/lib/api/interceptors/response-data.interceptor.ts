import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ApiSettings } from '../api.settings';
import { API_SETTINGS } from '../api.settings.constants';

@Injectable()
export class ResponseDataInterceptor implements HttpInterceptor {
    private _responseDataPropertyName: string;

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
    ){
        this._responseDataPropertyName = settings.responseDataPropertyName;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        event = event.clone({
                            body: (this._responseDataPropertyName && this._responseDataPropertyName.length > 0) 
                                ? event.body[this._responseDataPropertyName] 
                                : event.body
                        });
                    }
                    return event;
                })
            );
    }
}