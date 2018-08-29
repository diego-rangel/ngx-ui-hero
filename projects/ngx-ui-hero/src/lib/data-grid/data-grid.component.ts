import { Component, OnInit, Inject, Input, Output, EventEmitter, ContentChild, TemplateRef, Optional, DoCheck, ViewChild, IterableDiffers } from '@angular/core';

import { PageChangedEvent, PaginationComponent } from 'ngx-bootstrap/pagination';
import { BsModalService } from 'ngx-bootstrap';

import { DatagridExportingModalComponent } from './datagrid-exporting-modal/datagrid-exporting-modal.component';
import { DATAGRID_CONFIG } from './config/data-grid-config.constants';
import { DataGridColumnModel, EnumAlignment, EnumSortDirection, DataGridSortingModel } from './models/data-grid-column.model';
import { DataGridConfig, EnumDataGridMode, EnumAutoFitMode } from './config/data-grid-config';
import { ActionsColumnDirective } from './directives/data-grid-templates.directive';

import * as _ from 'lodash';

declare var $: any;
let identifier = 0;

@Component({
    selector: 'datagrid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.scss']
})

export class DataGridComponent implements OnInit, DoCheck, DataGridConfig {
    initialRenderApplied: boolean = false;
    sortApplied: boolean = false;
    animating: boolean = false;
    selectAll: boolean = false;
    currentPage: number;
    gridData: Array<any>;

    public identifier = `datagrid-${identifier++}`;

    @Input() tableId?: string = this.identifier;
    @Input() columns: Array<DataGridColumnModel>;
    @Input() emptyResultsMessage?: string = 'No results found at this moment.';
    @Input() infoMessage?: string = 'Showing records from {recordsFrom} to {recordsTo} of {totalRecords} records found.';
    @Input() animated?: boolean = true;
    @Input() striped?: boolean = true;
    @Input() bordered?: boolean = true;
    @Input() hoverEffect?: boolean = true;
    @Input() responsive?: boolean = true;
    @Input() showCheckboxColumn?: boolean = false;
    @Input() showSummaries?: boolean = false;
    @Input() allowExports?: boolean = false;
    @Input() exportButtonLabel?: string = 'Export';
    @Input() exportedFileName?: string = 'Export';
    @Input() exportedExcelSheetName?: string = 'Sheet';
    @Input() initialColumnToSort?: number;
    @Input() initialSortDirection?: EnumSortDirection = EnumSortDirection.Ascending;
    @Input() mode?: EnumDataGridMode = EnumDataGridMode.OnClient;
    @Input() totalItems?: number;
    @Input() itemsPerPage?: number = 10;
    @Input() maxSize?: number = 10;
    @Input() boundaryLinks?: boolean = true;
    @Input() directionLinks?: boolean = true;
    @Input() rotate?: boolean = true;
    @Input() showActionsColumn?: boolean = false;
    @Input() actionsColumnCaption?: string = '#';
    @Input() actionsColumnWidth?: string = '100px';
    @Input() firstText: string = 'First';
    @Input() previousText: string = 'Previous';
    @Input() nextText: string = 'Next';
    @Input() lastText: string = 'Last';
    @Input() autoFitMode?: EnumAutoFitMode = EnumAutoFitMode.ByContent;
    @Output() OnSelectionChanged = new EventEmitter();
    @Output() OnRowSelected = new EventEmitter<any>();
    @Output() OnPaginate = new EventEmitter<any>();
    @Output() OnSort = new EventEmitter<DataGridColumnModel>();
    @ContentChild(ActionsColumnDirective, {read: TemplateRef}) actionsColumnTemplate: ActionsColumnDirective;
    @ViewChild('paginator') paginator: PaginationComponent;

    private _differ: any;
    private _internalData: Array<any>;
    private _externalData: Array<any>;
    private _externalColumns: Array<DataGridColumnModel>;
    private _maxWidth = 400;

    get data(): Array<any> {
        return this._externalData;
    }    
    @Input('data')
    set data(value: Array<any>) {
        this._externalData = value;

        if (this.isUndefinedOrNull(value) && !this.isUndefinedOrNull(this._internalData)) {
            this.Rerender();
        }
    }

    constructor(
        @Inject(DATAGRID_CONFIG) @Optional() defaultOptions: DataGridConfig,
        private iterableDiffers: IterableDiffers,
        private modalService: BsModalService
    ) {
        Object.assign(this, defaultOptions);

        if (defaultOptions.paging) {
            Object.assign(this, defaultOptions.paging);
        }
        if (defaultOptions.styles) {
            Object.assign(this, defaultOptions.styles);
        }
        if (defaultOptions.exporting) {
            Object.assign(this, defaultOptions.exporting);
        }

        this._differ = this.iterableDiffers.find([]).create(null);
    }

    ngOnInit() {
        this.initializeColumns();
        this.Rerender();
    }
    ngDoCheck(): void {
        let changes = this._differ.diff(this._externalData);
        if (changes) {
            this.Rerender();
        }
    }

    ToogleSorting(column: DataGridColumnModel): void {
        if (!column.sortable || !column.sort) {
            return;
        }

        if (this.mode == EnumDataGridMode.OnClient) {
            if (column.sort.sorting) {
                if (column.sort.sortDirection == EnumSortDirection.Ascending) {
                    column.sort.sortDirection = EnumSortDirection.Descending;
                } else {
                    column.sort.sortDirection = EnumSortDirection.Ascending;
                }
            } else {
                for (let i = 0; i < this.columns.length; i++) {
                    this.columns[i].sort.sorting = false;
                }
    
                column.sort.sorting = true;
                column.sort.sortDirection = EnumSortDirection.Ascending;
            }
    
            this.sortOnClient(column);
        } else {
            if (this.isUndefinedOrNull(this.OnSort)) {
                console.error('The [OnSort] callback must be provided when DataGrid Server mode is enabled.');
                return;
            }

            this.OnSort.emit(column);
        }        
    }

    PageChanged(event: PageChangedEvent): void {
        if (this.mode == EnumDataGridMode.OnClient) {
            this.paginateOnClient(event.page);
        } else {
            if (this.isUndefinedOrNull(this.OnPaginate)) {
                console.error('The [OnPaginate] callback must be provided when DataGrid Server mode is enabled.');
                return;
            }

            this.OnPaginate.emit(event);
        }
    }

    GetInfo(): string {
        let result = this.infoMessage;
        let recordsFrom: number = this.currentPage * this.itemsPerPage - (this.itemsPerPage - 1);
        let recordsTo: number = this.currentPage * this.itemsPerPage;
        let totalRecords: number = this._internalData ? this._internalData.length : 0;

        if (recordsTo > totalRecords) {
            recordsTo = recordsTo - (recordsTo - totalRecords);
        }

        return result
            .replace('{recordsFrom}', recordsFrom.toString())
            .replace('{recordsTo}', recordsTo.toString())
            .replace('{totalRecords}', totalRecords.toString());
    }

    Rerender(): void {
        setTimeout(() => {
            this.initializeGridData();
			this.initializePaging();
			this.initializeSorting();
            this.handleAutoFit();
            this.handleInitialRenderingFlag();
        },0);
    }

    RenderPropertyValue(propertyPath: string, object: any): any {
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

    RenderColumnSummary(column: DataGridColumnModel): number {
        if (!this.gridData || this.gridData.length == 0) {
            return 0;
        }
        
        return _.sumBy(this.gridData, x => Number(this.RenderPropertyValue(column.data, x)));
    }

    HasSummarizableColumns(): boolean {
        if (!this.columns || this.columns.length == 0) {
            return false;
        }
        
        return _.some(this.columns, x => x.summarizable);
    }

    OnSelectAllChanged(): void {
        if (!this.gridData || this.gridData.length == 0) {
            return;
        }

        for (let i = 0; i < this.gridData.length; i++) {
            this.gridData[i].selected = this.selectAll;
        }

        this.OnSelectionChanged.emit();
    }

    OnRowSelectedChanged(row: any): void {
        this.handleSelectAllCheckboxState();
        this.OnRowSelected.emit(row);
        this.OnSelectionChanged.emit();
    }

    ExportToExcel() {
        this.modalService.show(DatagridExportingModalComponent, {
            class: 'modal-md',
            initialState: {
                data: this._externalData,
                columns: this.columns.slice(0),
                exportedFileName: this.exportedFileName,
                exportedExcelSheetName: this.exportedExcelSheetName,
                initialColumnToSort: this.initialColumnToSort,
                initialSortDirection: this.initialSortDirection,
            }
        });
        
        return false;
    }

    private initializeGridData(): void {
        if (this._externalData) {
            this._internalData = Object.assign([], this._externalData);
        } else {
            this._internalData = [];
        }

        this.gridData = Object.assign([], this._internalData);
    }
    private initializeColumns(): void {
        if (!this.columns || this.columns.length == 0) {
            console.error('Param [columns] cannot be undefined or empty.');
            return;
        }
        
        this._externalColumns = Object.assign([], this.columns);

        for (let i = 0; i < this.columns.length; i++) {
            let target: DataGridColumnModel = {
                caption: null,
                captionAlignment: EnumAlignment.Left,
                captionClasses: null,
                data: null,
                dataAlignment: EnumAlignment.Left,
                dataClasses: null,         
                sortable: true,
                sortDirection: EnumSortDirection.Ascending
            };

            Object.assign(target, this.columns[i]);

            this.columns[i] = target;
            this.columns[i].sort = new DataGridSortingModel();

            if (!this.isUndefinedOrNull(this.initialColumnToSort) && this.initialColumnToSort == i) {
                this.columns[i].sort.sorting = true;
                this.columns[i].sort.sortDirection = this.initialSortDirection;
            }
        }
    }
    private initializeSorting(): void {
        if (this.isUndefinedOrNull(this._internalData) || this._internalData.length == 0 || this.mode == EnumDataGridMode.OnServer || this.isUndefinedOrNull(this.initialColumnToSort)) {
            this.sortApplied = true;
            return;
        }
        if (this.initialColumnToSort > (this.columns.length - 1)) {
            console.error('Param [initialColumnToSort] greater than the number of columns.');
            this.sortApplied = true;
            return;
        }

        const columnToSort = _.find(this.columns, x => x.sortable && x.sort && x.sort.sorting);

        if (this.isUndefinedOrNull(columnToSort)) {
            this.sortApplied = true;
            return;
        }

        this.sortOnClient(columnToSort);
        this.sortApplied = true;
    }
    private initializePaging(): void {
        this.currentPage = 1;

        if (this._internalData && this.mode == EnumDataGridMode.OnClient) {
            this.totalItems = this._internalData.length;
        }

        if (this.paginator) {
            this.paginator.page = this.currentPage;
            this.paginator.totalItems = this.totalItems;
        }        
    }
    private isUndefinedOrNull(value: any): boolean {
        return value == undefined || value == null;
    }
    private sortOnClient(column: DataGridColumnModel): void {
        this._internalData = _.orderBy(this._internalData, [column.data], [column.sort.sortDirection]);

        this.paginateOnClient(this.currentPage);
    }
    private paginateOnClient(page: number): void {
        const startItem = (page - 1) * this.itemsPerPage;
        const endItem = page * this.itemsPerPage;
        this.gridData = this._internalData.slice(startItem, endItem);
        
        this.handleSelectAllCheckboxState();
        this.handleAutoFit();
    }
    private handleAutoFit(): void {
        switch (this.autoFitMode) {
            case EnumAutoFitMode.ByContent:
                this.autofitByContent();
                break;
            case EnumAutoFitMode.ByCaption:
                this.autofitByCaption();
                break;        
            default:    
                this.autofitByFixedWidths();            
                break;
        }
    }
    private autofitByContent(): void {
        if (!this.gridData || this.gridData.length == 0) {
            this.autofitByCaption();
            return;
        }

        this.animating = true;

        setTimeout(()=> {
            let widths: number[] = [];
            let gridWidth: number = $(`#${this.tableId}`).parent().width();

            if (gridWidth == 0 && $(`#${this.tableId}`).parents('.tab-content').length) {
                gridWidth = $(`#${this.tableId}`).parents('.tab-content').width();
            }

            for (let rowIndex = 0; rowIndex < this.gridData.length; rowIndex++) {
                for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                    let width: number = 150;
                    let currentData: string;
    
                    if (!this.isUndefinedOrNull(this.columns[columnIndex].data)) {                        
                        if (this.columns[columnIndex].data.split('.').length > 1) {
                            currentData = this.RenderPropertyValue(this.columns[columnIndex].data, this.gridData[rowIndex]);
                        } else {
                            currentData = this.gridData[rowIndex][this.columns[columnIndex].data];
                        }
                    }
                    if (!this.isUndefinedOrNull(currentData)) {
                        width = (currentData.toString().length * 10) + 20;
                    }
                    if (!this.isUndefinedOrNull(this.columns[columnIndex].caption)) {
                        let widthByCaption = (this.columns[columnIndex].caption.toString().length * 10) + 40;

                        if (widthByCaption > width) {
                            width = widthByCaption;
                        }
                    }
    
                    if (this.isUndefinedOrNull(widths[columnIndex]) || width > widths[columnIndex]){
                        if (width > this._maxWidth) {
                            widths[columnIndex] = this._maxWidth;
                        } else {
                            widths[columnIndex] = width;
                        }                        
                    }
                }
            }

            this.setDataGridWidths(widths, gridWidth);
            
            this.animating = false;
        },0);
    }
    private autofitByCaption(): void {
        this.animating = true;

        setTimeout(()=> {
            for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                if (this.isUndefinedOrNull(this.columns[columnIndex].width)) {
                    let widthByCaption = (this.columns[columnIndex].caption.toString().length * 10) + 40;
                    this.columns[columnIndex].width = `${widthByCaption}px`;
                }
            }            
            
            this.animating = false;
        },0);
    }
    private autofitByFixedWidths(): void {
        this.animating = true;

        setTimeout(()=> {
            for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                if (this.isUndefinedOrNull(this.columns[columnIndex].width)) {
                    this.columns[columnIndex].width = '150px';
                }
            }            
            
            this.animating = false;
        },0);
    }
    private handleSelectAllCheckboxState(): void {
        if (!this.gridData || this.gridData.length == 0) {
            this.selectAll = false;
            return;
        }

        for (let i = 0; i < this.gridData.length; i++) {
            if (!this.gridData[i].selected) {
                this.selectAll = false;
                return;
            }
        }

        this.selectAll = true;
    }
    private setDataGridWidths(widths: number[], gridWidth: number): void {
        let initialColumnsWidths = _.map(this._externalColumns, 'width');
        let totalColumnsWidth = _.sum(widths);
        let totalColumnsWidthGreaterThanGrid = totalColumnsWidth > gridWidth;

        if (!totalColumnsWidthGreaterThanGrid) {
            let biggestColumnIndex = 0;
            let biggestWidth = widths[widths.length - 1];
            for (let i = (widths.length - 2); i >= 0; i--) {
                if (widths[i] > biggestWidth) {
                    biggestWidth = widths[i];
                    biggestColumnIndex = i;
                }
            }
    
            for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                if (columnIndex == biggestColumnIndex) {
                    this.columns[columnIndex].width = `auto`;

                    if (widths[columnIndex] >= this._maxWidth) {
                        this.columns[columnIndex].dataClasses = 'td-break-word';
                    }
                } else {
                    this.columns[columnIndex].width = `${widths[columnIndex]}px`;
                }                
            }
        } else {
            for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                if (widths[columnIndex] >= this._maxWidth) {
                    this.columns[columnIndex].dataClasses = 'td-break-word';
                }

                this.columns[columnIndex].width = `${widths[columnIndex]}px`;             
            }
        }

        for (let i = 0; i < initialColumnsWidths.length; i++) {
            if (initialColumnsWidths[i]) {
                this.columns[i].width = initialColumnsWidths[i];
            }
        }
    }
    private handleInitialRenderingFlag(): void {
        if (!this.initialRenderApplied) {
            setTimeout(()=> {
                this.initialRenderApplied = true;
            }, 1500);
        }
    }
}
