import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule, UiModule, CoreSettings } from 'ngx-ui-hero';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

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
      CommonModule,
      UiModule.forRoot(),
      CoreModule.forRoot(coreSettings),
      HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
