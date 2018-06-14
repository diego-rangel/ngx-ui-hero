import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  installationCode = `npm install --save ngx-ui-hero`;

  apiModuleSetupCode = `
import { NgxUiHeroApiModule, ApiSettings } from 'ngx-ui-hero';

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
    NgxUiHeroApiModule.forRoot(apiSettings)
  ],
})
export class MyModule { }
  `;

  mainModuleSetupCode = `
import { NgxUiHeroModule } from 'ngx-ui-hero';

@NgModule({
  imports: [
    NgxUiHeroModule
  ],
})
export class MyModule { }
  `;

}
