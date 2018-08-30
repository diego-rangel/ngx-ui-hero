import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxUiHeroModule, NgxUiHeroApiModule, NgxUiHeroInputFormsModule, ApiSettings, NgxUiHeroDataGridModule, DataGridConfig, InputFormsConfig } from 'ngx-ui-hero';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HighlightModule } from 'ngx-highlightjs';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AppRoutingModule } from './app.routing.module';
import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './services/services.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { AnchorLinkDirective } from './directives/anchor.directive';
import { ButtonsComponent } from './buttons/buttons.component';

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

export const dataGridSettings: DataGridConfig = {
  styles: {
    animated: true,
    striped: true,
    bordered: true,
    hoverEffect: true,
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
  },
  date: {
    format: 'dd/MM/yyyy',
    locale: 'pt-br'
  }
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgxUiHeroModule,
    NgxUiHeroApiModule.forRoot(apiSettings),
    NgxUiHeroDataGridModule.forRoot(dataGridSettings),
    NgxUiHeroInputFormsModule.forRoot(inputFormsConfig),
    TabsModule.forRoot(),
    HighlightModule.forRoot({theme: 'github'}),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    ComponentsComponent,
    ServicesComponent,
    DatagridComponent,
    AnchorLinkDirective,
    ButtonsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
