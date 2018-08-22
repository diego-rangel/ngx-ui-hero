import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UiModule } from './../ui/ui.module';

import { DATAGRID_CONFIG } from './data-grid-config.constants';

import { DataGridConfig } from './data-grid-config';
export { DataGridConfig, EnumDataGridMode, EnumAutoFitMode } from './data-grid-config';

import { DataGridComponent } from './data-grid.component';
export { DataGridComponent } from './data-grid.component';

import { ActionsColumnDirective } from './data-grid-templates.directive';

export { DataGridColumnModel, DataGridSortingModel, EnumAlignment, EnumSortDirection } from './data-grid-column.model';

import { ExcelService } from './services/excel.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    DataGridComponent,
    ActionsColumnDirective
  ],  
  exports: [
    DataGridComponent,
    ActionsColumnDirective
  ],
  providers: [
    ExcelService
  ],  
})
export class NgxUiHeroDataGridModule {
  static forRoot(config: DataGridConfig): ModuleWithProviders {
    return {
      ngModule: NgxUiHeroDataGridModule,
      providers: [
        {
          provide: DATAGRID_CONFIG,
          useValue: config,
        }
      ]
    };
  }
}
