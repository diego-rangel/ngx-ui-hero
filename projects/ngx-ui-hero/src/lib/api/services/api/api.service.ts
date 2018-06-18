import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Request, Response, RequestMethod, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiSettings } from '../../api.settings';
import { API_SETTINGS } from '../../api.settings.constants';

import { ResponseHandlerService } from './response-handler.service';
import { AuthService } from './../auth/auth.service';

import { KeyValuePair } from '../../classes/key-value-pair';
export { KeyValuePair } from '../../classes/key-value-pair';

@Injectable()
export class ApiService {
  baseUrl: string;

  constructor(
    @Inject(API_SETTINGS) public settings: ApiSettings,
    private http: Http,
    private responseHandler: ResponseHandlerService,
    private authService: AuthService,
  ) {
    this.baseUrl = this.settings.apiBaseUrl;
  }

  get(url: string, query?: KeyValuePair[], headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Get,
      query,
      null,
      headers,
      responseType,
      autoMapResponse
    );
  }
  post(url: string, data: any, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Post,
      null,
      data,
      headers,
      responseType,
      autoMapResponse
    );
  }
  put(url: string, data: any, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Put,
      null,
      data,
      headers,
      responseType,
      autoMapResponse
    );
  }
  delete(url: string, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Delete,
      null,
      null,
      headers,
      responseType,
      autoMapResponse
    );
  }

  private sendRequest(url: string , method: RequestMethod, query: KeyValuePair[], body: any, headers: Headers, responseType?: ResponseContentType, autoMapResponse?: boolean): Observable<any> {
    let requestBody: any = body;
    let responseContentType = ResponseContentType.Json;
    let canAutoMapResponse = true;

    if (responseType != null) {
      responseContentType = responseType;
    }

    if (autoMapResponse != null) {
      canAutoMapResponse = autoMapResponse;
    }

    if (body instanceof Object) {
      requestBody = this.getJson(body);
    }

    const request = new Request({
      method: method,
      url: url,
      params: this.getQueryStringParams(query),
      body: requestBody,
      headers: headers || this.buildRequestHeaders(),
      responseType: responseContentType
    });

    return this.http.request(request)
      .pipe(
        map(response => {
          if (canAutoMapResponse) {
            return this.responseHandler.handleSuccess(response, responseContentType);
          } else {
            return response;
          }        
        }),
        catchError(reason => this.responseHandler.handleError(reason))
      );
  }
  private getQueryStringParams(query: KeyValuePair[]): URLSearchParams {
    if (query == null) {
      return null;
    }

    const params: URLSearchParams = new URLSearchParams();

    query.forEach(x => {
      params.set(x.Key, x.Value);
    });

    return params;
  }
  private getJson(data: any): string {
    if (data == null) {
      return null;
    }
    return JSON.stringify(data);
  }
  private buildRequestHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    if (this.authService.IsAuthenticated()) {
      const token = this.authService.GetToken();
      headers.append('Authorization', token);
    }
    
    return headers;
  }
  private buildUrl(url: string, fullUrl: Boolean): string {
    if (!fullUrl) {
      return this.baseUrl + `${url}`;
    } else {
      return url;
    }    
  }
}
