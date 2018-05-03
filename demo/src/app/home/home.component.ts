import { AlertService } from 'ngx-ui-hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private alert: AlertService,
  ) { }

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
