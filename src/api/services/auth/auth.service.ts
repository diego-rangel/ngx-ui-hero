import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalStorageService } from './../storage/local-storage.service';

import { ApiSettings } from '../../api.settings';
import { API_SETTINGS } from '../../api.settings.constants';

@Injectable()
export class AuthService {
    public static onAuthenticationChangeEmitter = new EventEmitter<boolean>(false);
    private localStorageKey = 'authorizationData';

    constructor(
        @Inject(API_SETTINGS) public settings: ApiSettings,
        private localStorageService: LocalStorageService,
        private http: Http,
    ) {}

    Autheticate(username: string, password: string): Observable<any> {
        const url = this.settings.apiBaseUrl + this.settings.jwtEndpointPath;
        const data = {};
        data[this.settings.requestProperties.usernameAuthProperty] = username;
        data[this.settings.requestProperties.passwordAuthProperty] = password;

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        return this.http.post(url, JSON.stringify(data), { headers: headers })
            .map(response => {
                const result = response.json();
                const accessTokenProp = this.settings.responseProperties.accessTokenAuthProperty
                    ? this.settings.responseProperties.accessTokenAuthProperty
                    : 'access_token';

                if (result && result[accessTokenProp]) {
                    this.storeToken(result[accessTokenProp]);
                }

                return true;
            });
    }
    Logout(): void {
        this.removeToken();
    }
    IsAuthenticated(): boolean {
        const storage: any = this.localStorageService.Get(this.localStorageKey);
        return storage != null;
    }
    GetToken(): string {
        return this.localStorageService.Get(this.localStorageKey);
    }

    private storeToken(token: string): void {
        this.localStorageService.Set(this.localStorageKey, token);
    }
    private removeToken(): void {
        this.localStorageService.Remove(this.localStorageKey);
    }
}
