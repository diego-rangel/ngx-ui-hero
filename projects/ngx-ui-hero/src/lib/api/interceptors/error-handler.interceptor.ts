import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError({
                    unauthorized: error.status == 401 || error.status == 403,
                    code: error.status,
                    message: error.message,
                    data: error.error
                });
            })
        );
  }
}