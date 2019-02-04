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

  authConstructorCode = `
constructor(
  private authService: AuthService
) {}
`;

  apiConstructorCode = `
constructor(
  private apiService: ApiService
) {}
`;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {}

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
