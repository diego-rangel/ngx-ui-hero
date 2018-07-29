import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UiModule } from './../ui/ui.module';

import { DATAGRID_CONFIG } from './data-grid-config.constants';

import { DataGridConfig, EnumDataGridPagingMode } from './data-grid-config';
export { DataGridConfig, EnumDataGridPagingMode } from './data-grid-config';

import { DataGridComponent } from './data-grid.component';
export { DataGridComponent } from './data-grid.component';

export { DataGridColumnModel, DataGridSortingModel, EnumAlignment, EnumSortDirection } from './data-grid-column.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule
  ],
  declarations: [
    DataGridComponent
  ],  
  exports: [
    DataGridComponent
  ],
  providers: [],  
})
export class NgxUiHeroDataGridModule {
  static forRoot(config?: DataGridConfig): ModuleWithProviders {
    let source = config || {};

    let target: DataGridConfig = {
      emptyResultsMessage: 'No results found at this moment.',
      paging: {
        pagingMode: EnumDataGridPagingMode.OnClient,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        boundaryLinks: true,
        directionLinks: true,
        rotate: true,
        maxSize: 10
      },
      styles: {
        striped: true,
        bordered: true,
        hoverEffect: true,
        responsive: true
      }
    };

    let result = Object.assign(target, source);

    return {
      ngModule: NgxUiHeroDataGridModule,
      providers: [
        {
          provide: DATAGRID_CONFIG,
          useValue: result
        }
      ]
    };
  }
}
