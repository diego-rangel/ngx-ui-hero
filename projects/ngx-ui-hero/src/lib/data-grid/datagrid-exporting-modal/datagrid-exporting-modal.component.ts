import { orderBy } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component, OnInit } from '@angular/core';

import { DataGridColumnModel, EnumSortDirection } from '../models/data-grid-column.model';
import { ExcelService } from '../services/excel.service';
import { LoadingImage } from './loading-image';

@Component({
  selector: 'ui-datagrid-exporting-modal',
  templateUrl: './datagrid-exporting-modal.component.html'
})
export class DatagridExportingModalComponent implements OnInit {
  loadingImage: string = new LoadingImage().image;
  tableId: string = 'datagrid-exportation';
  columns: Array<DataGridColumnModel>;
  data: Array<any>;
  initialColumnToSort: number;
  initialSortDirection: EnumSortDirection;
  exportedExcelSheetName: string;
  private exportedFileName: string;  

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private excelService: ExcelService,
  ) { }

  ngOnInit() {
    this.columns = this.modalService.config.initialState['columns'];
    this.data = this.modalService.config.initialState['data'];
    this.initialColumnToSort = this.modalService.config.initialState['initialColumnToSort'];
    this.initialSortDirection = this.modalService.config.initialState['initialSortDirection'];
    this.exportedFileName = this.modalService.config.initialState['exportedFileName'];
    this.exportedExcelSheetName = this.modalService.config.initialState['exportedExcelSheetName'];

    this.export();
  }

  private export(): void {
    setTimeout(()=> {
      this.excelService.ExportJsonToExcel(this.buildExportedJson(), this.exportedFileName);
      this.modalRef.hide();
    }, 1000);
  }
  private buildExportedJson(): any[] {
    if (!this.data || !this.columns) {
      return [];
    }

    let result: any[] = [];

    for (let r = 0; r < this.data.length; r++) {
      let rowObject: any = {};

      for (let c = 0; c < this.columns.length; c++) {
        let property: string = this.columns[c].caption;
        let data: string;
        let currentData: string;

        if (this.columns[c].data) {
          currentData = this.renderPropertyValue(this.columns[c].data, this.data[r]);
        }

        if (!this.columns[c].renderOnPrint && !this.columns[c].render && this.columns[c].data) {
          data = currentData;
        } else if (this.columns[c].renderOnPrint) {
          data = this.columns[c].renderOnPrint(this.data[r], currentData, r);
        } else if (this.columns[c].render) {
          data = this.columns[c].render(this.data[r], currentData, r);
        }

        rowObject[property] = data;
      }

      result.push(rowObject);
    }

    return orderBy(result, [this.columns[this.initialColumnToSort].caption], [this.initialSortDirection]);
  }
  private renderPropertyValue(propertyPath: string, object: any): any {
    let parts: string[] = propertyPath.split( "." );
    let property: any = object || {};
  
    for (let i = 0; i < parts.length; i++) {
        if (!property) {
            return null;
        }

        property = property[parts[i]];
    }

    return property;
  }

}
