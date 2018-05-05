import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightModule } from 'ngx-highlightjs';

import { CoreModule, UiModule, CoreSettings } from 'ngx-ui-hero';

import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';

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
    HighlightModule.forRoot({ theme: 'github'}),
    UiModule.forRoot(),
    CoreModule.forRoot(coreSettings),
    ServicesRoutingModule
  ],
  declarations: [ServicesComponent],
})
export class ServicesModule { }
