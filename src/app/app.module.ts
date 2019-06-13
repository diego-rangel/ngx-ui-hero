import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HighlightModule } from 'ngx-highlightjs';
import { ApiSettings, DataGridConfig, InputFormsConfig, NgxUiHeroApiModule, NgxUiHeroDataGridModule, NgxUiHeroInputFormsModule, NgxUiHeroModule, NgxUiHeroTreeViewModule, TreeViewConfig } from 'ngx-ui-hero';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ComponentsComponent } from './components/components.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { AnchorLinkDirective } from './directives/anchor.directive';
import { GetStartedComponent } from './get-started/get-started.component';
import { HeaderComponent } from './header/header.component';
import { PrintingComponent } from './printing/printing.component';
import { ServicesComponent } from './services/services.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ModalExampleComponent } from './ui/modal-example/modal-example.component';
import { UiComponent } from './ui/ui.component';

defineLocale('pt-br', ptBrLocale);

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
  },
  monthYear: {
    placeholder: 'Select...',
    language: 'en',
    format: 'MMM/yyyy'
  },
};

export const treeViewConfig: TreeViewConfig = {
  showIcons: true,
  expandAllOnInit: true,
  emptyResultsMessage: 'No results found at this moment.',
  styles: {
    enableLabelLinkStyle: false,
    normalItemIconClass: 'fa fa-file',
    collapsableClosedItemIconClass: 'fa fa-folder',
    collapsableOpennedItemIconClass: 'fa fa-folder-open'
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
    NgxUiHeroTreeViewModule.forRoot(treeViewConfig),
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
    UiComponent,
    TreeviewComponent,
    PrintingComponent,
    TutorialComponent,
    ModalExampleComponent
  ],
  entryComponents: [
    ModalExampleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
