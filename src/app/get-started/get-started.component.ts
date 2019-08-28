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
  apiBaseUrl: 'http://yourdomain/api',
  localStoragePrefix: 'myDemoAppPrefix_',
  jwtLocalStorageSuffix: 'access_token'
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
  },
  upload: {
    placeholder: 'Select a file to upload...',
    dropZonePlaceholder: 'Drag & drop a file to import.',
    autoUpload: true,
    showDropZone: true,
    showQueue: true,
    withCredentials: false,
    chunk: false,
    chunkSize: 1048576,
    chunkRetries: 3,
    chunkRequestsCountInParallel: 50,
    maxFileSize: 4,
    selectButtonIcon: 'fa fa-folder',
    selectButtonLabel: 'Select',
    removeButtonIcon: 'fa fa-trash',
    removeButtonLabel: 'Remove',
    fileTypeErrorMessage: 'The file type [{extension}] is not allowed.',
    fileSizeErrorMessage: 'This file exceeds the max file size allowed of {maxFileSize}MB.',
    maxFileSizeLabel: 'Max file size:',
    allowedExtensionsLabel: 'Allowed extensions:'
  },
  multiSelect: {
    placeholder: 'Select...',
    searchPlaceholder: 'Search...',
    displayTextProperty: 'text',
    valueProperty: 'value',
    emptyMessage: 'No results found.',
    selectAllButtonLabel: 'Select all',
    clearSelectionButtonLabel: 'Clear selection',
    maxCountOfLabelsToShow: 3
  },
  monthYear: {
    placeholder: 'Select...',
    language: 'en',
    format: 'MMM/yyyy'
  },
  dropDownGrid: {
    placeholder: 'Select...',
    searchPlaceholder: 'Search...',
    emptyResultsMessage: 'No results found at this moment.',
    displayTextProperty: 'text',
    valueProperty: 'value'
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
  allowColumnResize: true,
  allowColumnReorder: true,
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
  },
  exporting: {
    allowExports: false,
    exportButtonLabel: 'Export',
    exportedFileName: 'Export',
    exportedExcelSheetName: 'Sheet'
  },
  filtering: {
    allowColumnFilters: true,
    filterPlaceholder: 'Filter...',
    filterPlacement: 'top'
  }
};

@NgModule({
  imports: [
    NgxUiHeroDataGridModule.forRoot(dataGridSettings)
  ],
})
export class MyModule { }
  `;

  treeViewModuleSetupCode = `
import { NgxUiHeroTreeViewModule, TreeViewConfig } from 'ngx-ui-hero';

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
    NgxUiHeroTreeViewModule.forRoot(treeViewConfig)
  ],
})
export class MyModule { }
  `;

  chartsModuleSetupCode = `
import { NgxUiHeroChartsModule, ChartsConfig } from 'ngx-ui-hero';

export const chartsConfig: ChartsConfig = {
  locale: 'en-us',
  emptyMessage: 'No results found at this moment.'
};

@NgModule({
  imports: [
    NgxUiHeroChartsModule.forRoot(chartsConfig),
  ],
})
export class MyModule { }
  `;

}
