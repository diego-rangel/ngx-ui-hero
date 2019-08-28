import { AlertService } from 'ngx-ui-hero';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  alertConstructorCode = `
constructor(
  private alertService: AlertService
) {}
`;

  alertExamplesCode = `
this.alertService.success('Yeahhh', 'Some success text here =)');

this.alertService.info('Info', 'Some info text here');

this.alertService.error('Oops =(', 'My error message');

this.alertService.warning('Attention!', 'Some text here');

this.alertService.question('Question?!', 'Some text here', () => {
  // your success callback code.
});
  `;
  
  localStorageConstructorCode = `
constructor(
  private localStorageService: LocalStorageService
) {}
`;

  httpClientInterceptorsUsageCode = `
import {
  BaseApiUrlInterceptor, 
  CommonHeadersInterceptor, 
  JwtAuthInterceptor, 
  WinAuthInterceptor,
  ResponseDataInterceptor,
  ErrorHandlerInterceptor 
} from 'ngx-ui-hero';

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseDataInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: WinAuthInterceptor, multi: true },
  ],
})
export class AppModule { }
  `;

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    
  }

  testSweetAlertSuccess(): void {
    this.alertService.success('Yeahhh', 'Some success text here =)');
  }
  testSweetAlertInfo(): void {
    this.alertService.info('Info', 'Some info text here');
  }
  testSweetAlertError(): void {
    this.alertService.error('Oops =(', 'My error message');
  }
  testSweetAlertWarning(): void {
    this.alertService.warning('Attention!', 'Some text here');
  }
  testSweetAlertQuestion(): void {
    this.alertService.question('Question?!', 'Some text here', () => {
      this.testSweetAlertSuccess();
    });
  }

}
