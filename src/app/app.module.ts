import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import {
    ApiSettings, BaseApiUrlInterceptor, ChartsConfig, CommonHeadersInterceptor, DataGridConfig, ErrorHandlerInterceptor, InputFormsConfig, JwtAuthInterceptor, NgxUiHeroApiModule, NgxUiHeroChartsModule, NgxUiHeroDataGridModule, NgxUiHeroInputFormsModule,
    NgxUiHeroModule, NgxUiHeroTreeViewModule, ResponseDataInterceptor, TreeViewConfig
} from 'ngx-ui-hero';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ComponentsComponent } from './components/components.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { AnchorLinkDirective } from './directives/anchor.directive';
import { GanttComponent } from './gantt/gantt.component';
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
  apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  localStoragePrefix: 'myDemoAppPrefix_',
  jwtLocalStorageSuffix: 'access_token',
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
    enableLabelLinkStyle: true,
    normalItemIconClass: 'fa fa-file',
    collapsableClosedItemIconClass: 'fa fa-folder',
    collapsableOpennedItemIconClass: 'fa fa-folder-open'
  }
};

export const chartsConfig: ChartsConfig = {
  locale: 'en-us',
  emptyMessage: 'No results found at this moment.'
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUiHeroModule,
    NgxUiHeroChartsModule.forRoot(chartsConfig),
    NgxUiHeroApiModule.forRoot(apiSettings),
    NgxUiHeroDataGridModule.forRoot(dataGridSettings),
    NgxUiHeroInputFormsModule.forRoot(inputFormsConfig),
    NgxUiHeroTreeViewModule.forRoot(treeViewConfig),
    TabsModule.forRoot(),
    HighlightModule,
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
    ModalExampleComponent,
    GanttComponent
  ],
  entryComponents: [
    ModalExampleComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseDataInterceptor, multi: true },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
