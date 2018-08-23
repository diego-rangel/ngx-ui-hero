import { LoadingImage } from './loading-image';
import { ExcelService } from './../services/excel.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DataGridColumnModel, EnumSortDirection } from './../models/data-grid-column.model';

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
      this.excelService.ExportTableToExcel(this.tableId, this.exportedFileName, this.exportedExcelSheetName);
      this.modalRef.hide();
    }, 1000);
  }

}
