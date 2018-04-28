import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { LocalStorageService } from 'ngx-localstorage';
import 'rxjs/add/operator/map';
import { ResponseHandlerService } from '../api/response-handler.service';

import { CoreSettings } from '../../core.settings';
import { CORE_SETTINGS } from '../../core.settings.constants';


@Injectable()
export class AuthService {
    public static onAuthenticationChangeEmitter = new EventEmitter<boolean>(false);
    private localStorageKey = 'authorizationData';

    constructor(
        @Inject(CORE_SETTINGS) public settings: CoreSettings,
        private localStorage: LocalStorageService,
        private http: Http,
        private responseHandler: ResponseHandlerService
    ) {}

    Autheticate(username: string, password: string): Observable<boolean> {
        const url = this.settings.apiSettings.apiBaseUrl + this.settings.apiSettings.jwtEndpointPath;
        const data = `grant_type=password&username=${username}&password=${password}`;
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, data, { headers: headers })
            .map(response => {
                const result = this.responseHandler.handleSuccess(response);

                this.storeToken(result.access_token);
                return true;
            })
            .catch(reason => this.responseHandler.handleError(reason));
    }
    Logout(): void {
        this.removeToken();
    }
    IsAuthenticated(): boolean {
        const storage: any = this.localStorage.get(this.localStorageKey);
        return storage != null;
    }
    GetToken(): string {
        return this.localStorage.get(this.localStorageKey);
    }

    private storeToken(token: string): void {
        this.localStorage.set(this.localStorageKey, token);
    }
    private removeToken(): void {
        this.localStorage.remove(this.localStorageKey);
    }
}
