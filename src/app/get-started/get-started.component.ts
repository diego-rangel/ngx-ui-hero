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

  inputFormsModuleSetupCode = `
import { NgxUiHeroInputFormsModule, InputFormsConfig } from 'ngx-ui-hero';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

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
    theme: 'theme-dark-blue',
    placement: 'bottom',
    locale: 'pt-br'
  }
};

@NgModule({
  imports: [
    NgxUiHeroInputFormsModule.forRoot(inputFormsConfig)
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

  dataGridModuleSetupCode = `
import { NgxUiHeroDataGridModule, DataGridConfig, EnumDataGridMode, EnumAutoFitMode } from 'ngx-ui-hero';

export const dataGridSettings: DataGridConfig = {
  emptyResultsMessage: 'No results found at this moment.',
  infoMessage: 'Showing records from {recordsFrom} to {recordsTo} of {totalRecords} records found.',
  actionsColumnCaption: '#',
  mode: EnumDataGridMode.OnClient,
  autoFitMode: EnumAutoFitMode.ByContent,
  paging: {
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    boundaryLinks: true,
    directionLinks: true,
    rotate: true,
    maxSize: 10,
    itemsPerPage: 10
  },
  styles: {
    animated: true,
    striped: true,
    bordered: true,
    hoverEffect: true,
    responsive: true
  }
};

@NgModule({
  imports: [
    NgxUiHeroDataGridModule.forRoot(dataGridSettings)
  ],
})
export class MyModule { }
  `;

}
