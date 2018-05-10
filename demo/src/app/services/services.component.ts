import { Component, OnInit } from '@angular/core';

import { AlertService } from 'ngx-ui-hero';

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
this.alert.success('Yeahhh', 'Some success text here =)');

this.alert.info('Info', 'Some info text here');

this.alert.error('Oops =(', 'My error message');

this.alert.warning('Attention!', 'Some text here');

this.alert.question('Question?!', 'Some text here', () => {
  // your success callback code.
});
  `;

  sweetAlertSetupCode = `
"scripts": [
  "../node_modules/sweetalert2/dist/sweetalert2.all.min.js"
],
  `;

  constructor(
    private alert: AlertService,
  ) { }

  ngOnInit() {
  }

  testSweetAlertSuccess(): void {
    this.alert.success('Yeahhh', 'Some success text here =)');
  }
  testSweetAlertInfo(): void {
    this.alert.info('Info', 'Some info text here');
  }
  testSweetAlertError(): void {
    this.alert.error('Oops =(', 'My error message');
  }
  testSweetAlertWarning(): void {
    this.alert.warning('Attention!', 'Some text here');
  }
  testSweetAlertQuestion(): void {
    this.alert.question('Question?!', 'Some text here', () => {
      this.testSweetAlertSuccess();
    });
  }

}
