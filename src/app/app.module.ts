import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxUiHeroModule, NgxUiHeroApiModule, NgxUiHeroInputFormsModule, InputFormsConfig, ApiSettings } from 'ngx-ui-hero';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AppRoutingModule } from './app.routing.module';
import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './services/services.component';

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
export const inputFormsConfig: InputFormsConfig = {
  currency: {
    currencyCode: 'USD',
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: '.',
    thousands: ',',
    precision: 2,
    prefix: '',
    suffix: ''
  },
  validationMessages: {
    invalid: '{label} is invalid',
    required: '{label} is required',
    pattern: '{label} is invalid',
    maxlength: 'The filled-in value is greater than the maximum allowed',
    minlength: 'The filled-in value is less than the minimum allowed'
  }
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxUiHeroModule,
    NgxUiHeroApiModule.forRoot(apiSettings),
    NgxUiHeroInputFormsModule.forRoot(inputFormsConfig),
    AppRoutingModule,
    AngularFontAwesomeModule,
    HighlightModule.forRoot({ theme: 'github'}),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    ComponentsComponent,
    ServicesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
