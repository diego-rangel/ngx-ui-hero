import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';


@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {
  installationCode = `npm install --save ngx-ui-hero`;

  sweetAlertSetupCode = `
"scripts": [
  "../node_modules/sweetalert2/dist/sweetalert2.all.min.js"
],
  `;

  coreModuleSetupCode = `
import { CoreModule, CoreSettings } from 'ngx-ui-hero';

export const coreSettings: CoreSettings = {
  apiSettings: {
      apiBaseUrl: 'http://localhost:50467/api',
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
    CoreModule.forRoot(coreSettings)
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
