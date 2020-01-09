import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxUiHeroApiModule } from '../api';
import { UiModule } from '../ui/ui.module';
import { ColumnFilterComponent } from './components/column-filter/column-filter.component';
import { DataGridConfig } from './config/data-grid-config';
import { DATAGRID_CONFIG } from './config/data-grid-config.constants';
import { DataGridComponent } from './data-grid.component';
import { DatagridExportingModalComponent } from './datagrid-exporting-modal/datagrid-exporting-modal.component';
import { ActionsColumnDirective } from './directives/data-grid-templates.directive';
import { ExcelService } from './services/excel.service';

export { DataGridConfig, DataGridStylesConfig, DataGridPagingConfig, DataGridExportingConfig, EnumDataGridMode, EnumAutoFitMode } from './config/data-grid-config';
export { DataGridComponent } from './data-grid.component';
export { DataGridColumnModel, DataGridSortingModel, EnumAlignment, EnumSortDirection } from './models/data-grid-column.model';
export { ColumnFilterModel } from './models/column-filter.model';
export { ColumnReorderingDefinitionsModel, ColumnReorderingDefinitionsItemModel } from './models/column-reordering-definitions.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    NgxUiHeroApiModule
  ],
  declarations: [
    DataGridComponent,
    ActionsColumnDirective,
    DatagridExportingModalComponent,
    ColumnFilterComponent
  ],  
  exports: [
    DataGridComponent,
    ActionsColumnDirective
  ],
  entryComponents: [
    DatagridExportingModalComponent
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
