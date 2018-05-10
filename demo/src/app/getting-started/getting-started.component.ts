import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {
  installationCode = `npm install --save ngx-ui-hero`;

  apiModuleSetupCode = `
import { ApiModule, ApiSettings } from 'ngx-ui-hero';

export const apiSettings: ApiSettings = {
  apiBaseUrl: 'http://localhost:50467/api',
  jwtAuthSettings: {
    jwtEndpointPath: '/token',
    localStoragePrefix: 'myDemoAppPrefix_',
    requestProperties: {
      usernameAuthProperty: 'emailAddress',
      passwordAuthProperty: 'password'
    },
    responseProperties: {
      accessTokenAuthProperty: 'token'
    }
  },
  errorHandlingSettings: {
    unhandledErrorTitle: 'Oops!',
    unhandledErrorMessage: 'We encountered an internal fault while performing this operation.'
  }
};

@NgModule({
  imports: [
    ApiModule.forRoot(apiSettings)
  ],
})
export class MyModule { }
  `;

  uiModuleSetupCode = `
import { UiModule } from 'ngx-ui-hero';

@NgModule({
  imports: [
    UiModule.forRoot()
  ],
})
export class MyModule { }
  `;

  constructor(private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle('Getting Started | ngx-ui-hero');
  }

}
