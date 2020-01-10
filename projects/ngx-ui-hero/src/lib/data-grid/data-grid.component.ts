import * as _ from 'lodash';
import { BsModalService } from 'ngx-bootstrap';
import { PageChangedEvent, PaginationComponent } from 'ngx-bootstrap/pagination';

import { Component, ContentChild, DoCheck, EventEmitter, Inject, Input, isDevMode, IterableDiffers, OnInit, Optional, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';

import { LocalStorageService } from '../api';
import { DataGridConfig, EnumAutoFitMode, EnumDataGridMode } from './config/data-grid-config';
import { DATAGRID_CONFIG } from './config/data-grid-config.constants';
import { DatagridExportingModalComponent } from './datagrid-exporting-modal/datagrid-exporting-modal.component';
import { ActionsColumnDirective } from './directives/data-grid-templates.directive';
import { ColumnFilterModel } from './models/column-filter.model';
import { ColumnReorderingDefinitionsItemModel, ColumnReorderingDefinitionsModel } from './models/column-reordering-definitions.model';
import { DataGridColumnModel, DataGridSortingModel, EnumAlignment, EnumSortDirection } from './models/data-grid-column.model';

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
    isResizing: boolean = false;
    isReordering: boolean = false;
    currentElementBeingReorderedFromIndex: number = -1;
    currentElementBeingReorderedToIndex: number = -1;
    currentPage: number = 1;
    gridData: Array<any>;
    pageSizes: Array<number> = [10, 20, 30, 40, 50, 100];

    public identifier = `datagrid-${identifier++}`;

    @Input() debugMode: boolean = false;
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
    @Input() showSelectAllCheckbox?: boolean = true;
    @Input() showSummaries?: boolean = false;
    @Input() allowExports?: boolean = false;
    @Input() allowPageSizeChanges?: boolean = true;
    @Input() exportButtonLabel?: string = 'Export';
    @Input() exportedFileName?: string = 'Export';
    @Input() exportedExcelSheetName?: string = 'Sheet';
    @Input() initialColumnToSort?: number = 0;
    @Input() initialSortDirection?: EnumSortDirection = EnumSortDirection.Ascending;
    @Input() mode?: EnumDataGridMode = EnumDataGridMode.OnClient;
    @Input() totalItems?: number;
    @Input() itemsPerPage?: number = 10;
    @Input() maxSize?: number = 10;
    @Input() boundaryLinks?: boolean = true;
    @Input() directionLinks?: boolean = true;
    @Input() rotate?: boolean = true;
    @Input() showActionsColumn?: boolean = false;
    @Input() showInfos?: boolean = true;
    @Input() actionsColumnCaption?: string = '#';
    @Input() actionsColumnWidth?: string = '100px';
    @Input() firstText?: string = 'First';
    @Input() previousText?: string = 'Previous';
    @Input() nextText?: string = 'Next';
    @Input() lastText?: string = 'Last';
    @Input() autoFitMode?: EnumAutoFitMode = EnumAutoFitMode.ByContent;
    @Input() allowColumnResize?: boolean = true;
    @Input() allowColumnFilters?: boolean = true;
    @Input() allowColumnReorder?: boolean = true;
    @Input() userPerferencesKey?: string;
    @Input() filterPlaceholder?: string = 'Filter...';
    @Input() filterPlacement?: string = 'bottom';
    @Output() OnSelectionChanged = new EventEmitter();
    @Output() OnRowSelected = new EventEmitter<any>();
    @Output() OnRowRendered = new EventEmitter<any>();
    @Output() OnPaginate = new EventEmitter<any>();
    @Output() OnSort = new EventEmitter<DataGridColumnModel>();
    @Output() OnColumnFiltered = new EventEmitter<DataGridColumnModel>();
    @Output() OnPageSizeChanged = new EventEmitter<number>();
    @ContentChild(ActionsColumnDirective, {read: TemplateRef, static: true}) actionsColumnTemplate: ActionsColumnDirective;
    @ViewChild('paginator', {static: true}) paginator: PaginationComponent;

    private _differ: any;
    private _internalData: Array<any>;
    private _externalData: Array<any>;
    private _externalColumns: Array<DataGridColumnModel>;
    private _maxWidth = 400;
    private _minColumnWidth = 150;
    private _columnDefinitions: ColumnReorderingDefinitionsModel;

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
        private modalService: BsModalService,
        private renderer: Renderer2,
        private localStorage: LocalStorageService
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
        if (defaultOptions.filtering) {
            Object.assign(this, defaultOptions.filtering);
        }
        if (defaultOptions.reordering) {
            Object.assign(this, defaultOptions.reordering);
        }

        this._differ = this.iterableDiffers.find([]).create(null);
    }

    ngOnInit() {
        this.initializeColumns();
        this.Rerender();
    }
    ngDoCheck(): void {
        let changes = this._differ.diff(this._externalData);
        if (changes && this.initialRenderApplied) {
            this.Rerender();
        }
    }

    ToogleSorting(column: DataGridColumnModel): void {
        if (!column.sortable || !column.sort || this.isResizing) {
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
            this.paginateOnClient(this.currentPage);
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
        }

        this.OnPaginate.emit(event);
    }

    GetInfo(): string {
        let result = this.infoMessage;
        let recordsFrom: number = this.currentPage * this.itemsPerPage - (this.itemsPerPage - 1);
        let recordsTo: number = this.currentPage * this.itemsPerPage;
        let totalRecords: number = this.totalItems;

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
			this.initializeFilters();
			this.initializePaging();
			this.initializeSorting();
			this.initializePageSizes();
            this.handleAutoFit();
            this.handleInitialRenderingFlag();
        },0);
    }

    RenderPropertyValue(propertyPath: string, object: any): any {
        if (!propertyPath) return null;
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

    OnResizerMouseDown(e: any) {
        if (!this.allowColumnResize) return;
        
        this.isResizing = true;
        
        var pageX, curCol, nxtCol, curColWidth, nxtColWidth;
        
        curCol = e.target.parentElement;
        nxtCol = curCol.nextElementSibling;
        pageX = e.pageX; 
        
        var padding = this.paddingDiff(curCol);
        
        curColWidth = curCol.offsetWidth - padding;
        if (nxtCol)
            nxtColWidth = nxtCol.offsetWidth - padding;

        var onMouseMoveCallback = (e: any) => {
            if (curCol) {
                var diffX = e.pageX - pageX;
            
                if (nxtCol)
                    nxtCol.style.width = (nxtColWidth - (diffX))+'px';

                curCol.style.width = (curColWidth + diffX)+'px';
            }
        };
        var onMouseUpCallback = (e: any) => {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;

            setTimeout(() => {
                this.isResizing = false;
            });
            
            document.removeEventListener("mousemove", onMouseMoveCallback);
            document.removeEventListener("mouseup", onMouseUpCallback);
        };

        document.addEventListener("mousemove", onMouseMoveCallback);
        document.addEventListener("mouseup", onMouseUpCallback);
    }

    OnColumnMouseDown(e: any, index: number) {
        if (!this.allowColumnReorder) return;

        var onDragStartCallback = (e: any) => {
            var img = document.createElement("img");
            e.dataTransfer.setDragImage(img, 0, 0);            
            this.isReordering = true;
            this.currentElementBeingReorderedFromIndex = index;
            this.renderer.addClass(e.target.parentElement.parentElement, 'dragging');
            
            e.target.addEventListener("dragenter", (e: any) => onDragEnterCallback(e, index));
            e.target.addEventListener("dragend", onDragEndCallback);

            $(`#${this.identifier} thead tr th.column`).each((i, el) => {
                if (i != index) {
                    el.addEventListener("dragenter", (e: any) => onDragEnterCallback(e, i));
                    el.addEventListener("dragover", onDragOverCallback);
                }
            });
        };
        var onDragEndCallback = (e: any) => {
            if (this.currentElementBeingReorderedFromIndex != this.currentElementBeingReorderedToIndex) {
                this.debug('From', this.currentElementBeingReorderedFromIndex, 'To', this.currentElementBeingReorderedToIndex);
                
                var columnFromCopy = Object.assign({}, this.columns[this.currentElementBeingReorderedFromIndex]);
                var columnsCopy = Object.assign([], this.columns);
                columnsCopy.splice(this.currentElementBeingReorderedFromIndex, 1);
                columnsCopy.splice(this.currentElementBeingReorderedToIndex, 0, columnFromCopy);
                this.columns = columnsCopy;

                this.updateColumnReorderingDefinition();
            }

            this.isReordering = false;
            this.currentElementBeingReorderedFromIndex = -1;
            this.currentElementBeingReorderedToIndex = -1;
            this.renderer.removeClass(e.target.parentElement.parentElement, 'dragging');

            e.target.removeEventListener("dragenter", (e: any) => onDragEnterCallback(e, index));
            e.target.removeEventListener("dragend", onDragEndCallback);

            $(`#${this.identifier} thead tr th.column`).each((i, el) => {
                if (i != index) {
                    el.removeEventListener("dragenter", (e: any) => onDragEnterCallback(e, i));
                    el.removeEventListener("dragover", onDragOverCallback);
                }              
            });
        };
        var onDragEnterCallback = (e: any, i: number) => {
            this.currentElementBeingReorderedToIndex = i;
        };
        var onDragOverCallback = (e: any) => {
            e.preventDefault();
        };
        var onMouseUpCallback = (e: any) => {
            e.target.removeEventListener("dragstart", onDragStartCallback);
            e.target.removeEventListener("mouseup", onMouseUpCallback);
        };

        e.target.addEventListener("dragstart", onDragStartCallback);
        e.target.addEventListener("mouseup", onMouseUpCallback);
    }

    OnColumnFilterClick(e: Event, column: DataGridColumnModel) {
        if (!column.isFiltersOpenned) {
            this.closeAllColumnsFilters();
            column.isFiltersOpenned = true;
        } else {
            this.closeAllColumnsFilters();
        }
        
        e.stopPropagation();
    }

    OnFiltersChange(column: DataGridColumnModel) {
        if (this.mode == EnumDataGridMode.OnServer) {
            this.OnColumnFiltered.emit(column);
        } else {
            this.Rerender();
        }
    }

    HandlePageSizeChange(): void {
        if (this.mode == EnumDataGridMode.OnClient)
            this.Rerender();
            
        this.OnPageSizeChanged.emit(this.itemsPerPage);
    }

    private initializeGridData(): void {
        if (this._externalData) {
            this._internalData = Object.assign([], this._externalData);
        } else {
            this._internalData = [];
        }

        if (this.mode == EnumDataGridMode.OnServer) {
            this.gridData = Object.assign([], this._internalData);
            this.handleRowRenders();
        }        
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
                filterable: true,
                index: i
            };

            Object.assign(target, this.columns[i]);

            this.columns[i] = target;
            this.columns[i].sort = new DataGridSortingModel();

            if (!this.isUndefinedOrNull(this.initialColumnToSort) && this.initialColumnToSort == i) {
                this.columns[i].sort.sorting = true;

                if (this.columns[i].sortDirection) {
                    this.columns[i].sort.sortDirection = this.columns[i].sortDirection;
                } else {
                    this.columns[i].sort.sortDirection = this.initialSortDirection;
                }
            }            
        }

        this.verifyColumnIndexPersistences();
    }
    private initializeSorting(): void {
        if (this.isUndefinedOrNull(this._internalData) || this.mode == EnumDataGridMode.OnServer || this.isUndefinedOrNull(this.initialColumnToSort)) {
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
            this.paginateOnClient(this.currentPage);
        } else {
            this.sortOnClient(columnToSort);
            this.paginateOnClient(this.currentPage);
        }
        
        this.sortApplied = true;
    }
    private initializePaging(): void {
        if (!this.currentPage || this.mode == EnumDataGridMode.OnClient) {
            this.currentPage = 1;
        }

        if (this._internalData && this.mode == EnumDataGridMode.OnClient) {
            this.totalItems = this._internalData.length;
        }

        if (this.paginator) {
            this.paginator.page = this.currentPage;
            this.paginator.totalItems = this.totalItems;
        }
    }
    private initializePageSizes(): void {
        if (this.pageSizes.filter(x => x == this.itemsPerPage).length > 0) return;
        this.pageSizes.push(this.itemsPerPage);
        this.pageSizes = _.orderBy(this.pageSizes, x => x);
    }
    private paddingDiff(col: any): number { 
        if (this.getStyleVal(col,'box-sizing') == 'border-box') {
            return 0;
        }
       
        var padLeft = this.getStyleVal(col, 'padding-left');
        var padRight = this.getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));      
    }      
    private getStyleVal(elm: any, css: any): string {
        return window.getComputedStyle(elm, null).getPropertyValue(css);
    }
    private isUndefinedOrNull(value: any): boolean {
        return value == undefined || value == null;
    }
    private sortOnClient(column: DataGridColumnModel): void {
        this._internalData = _.orderBy(this._internalData, [column.data], [column.sort.sortDirection]);
    }
    private paginateOnClient(page: number): void {
        const startItem = (page - 1) * this.itemsPerPage;
        const endItem = page * this.itemsPerPage;
        this.gridData = this._internalData.slice(startItem, endItem);
        
        this.handleRowRenders();
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
                    let width: number = this._minColumnWidth;
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
                            
                            if (this.allowColumnResize) {
                                width += 20;
                            }
                            if (this.allowColumnFilters && this.columns[columnIndex].filterable && this.isUndefinedOrNull(widths[columnIndex]) || width > widths[columnIndex]) {
                                width += 30;
                            }
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

                    if (this.allowColumnResize) {
                        widthByCaption += 10;
                    }
                    if (this.allowColumnFilters && this.columns[columnIndex].filterable) {
                        widthByCaption += 30;
                    }

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
        let initialColumnsWidths = new Array<string>(this.columns.length);

        for (let i = 0; i < this._externalColumns.length; i++) {
            let columnDefaultWidth = this._externalColumns[i].width;
            
            let def = this.getColumnReorderingDefinitionFrom(this._externalColumns[i]);
            if (!def) {
                initialColumnsWidths[i] = columnDefaultWidth;
                continue;
            }

            initialColumnsWidths[def.userIndex] = columnDefaultWidth;
        }

        this.debug('initialColumnsWidths', initialColumnsWidths);

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
                        if (!this.columns[columnIndex].dataClasses) {
                            this.columns[columnIndex].dataClasses = '';
                        }

                        this.columns[columnIndex].dataClasses += ' td-break-word';
                    }
                } else {
                    this.columns[columnIndex].width = `${widths[columnIndex]}px`;
                }                
            }
        } else {
            for (let columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
                if (widths[columnIndex] >= this._maxWidth) {
                    if (!this.columns[columnIndex].dataClasses) {
                        this.columns[columnIndex].dataClasses = '';
                    }
                    
                    this.columns[columnIndex].dataClasses += ' td-break-word';
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
            this.initialRenderApplied = true;
        }
    }
    private initializeFilters() {
        if (!this.columns || this.columns.length == 0 || !this.data || this.data.length == 0 || this.mode == EnumDataGridMode.OnServer) return;

        let filters: ColumnFilterModel[] = [];

        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].simpleFilter) {
                filters.push(this.columns[i].simpleFilter);
            }
            if (this.columns[i].customFilters && this.columns[i].customFilters.length > 0) {
                filters.push(...this.columns[i].customFilters);
            }
        }

        if (!filters || filters.length == 0) return;

        this._internalData = this.data.filter((row: any, rowIndex: number) => {
            for (let i = 0; i < filters.length; i++) {
                let value: any = null;

                if (filters[i].column.render)
                    value = filters[i].column.render(row, this.RenderPropertyValue(filters[i].column.data, row), rowIndex);
                else      
                    value = this.RenderPropertyValue(filters[i].column.data, row);

                if (!filters[i].operator.validate(filters[i].filter, value)) {
                    return false;
                }
            }

            return true;
        });
    }
    private closeAllColumnsFilters() {
        if (!this.columns || this.columns.length == 0) return;

        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].isFiltersOpenned = false;
        }
    }
    private handleRowRenders() {
        if (!this.gridData || this.gridData.length == 0) return;
        for (let i = 0; i < this.gridData.length; i++) {
            this.OnRowRendered.emit(this.gridData[i]);
        }
    }

    private verifyColumnIndexPersistences(): void {
        if (!this.userPerferencesKey) return;
        let definition = this.getOrCreateColumnReorderingDefinition();
        this.applyColumnReorderingDefinition(definition);
    }
    private getColumnReorderingDefinition(): ColumnReorderingDefinitionsModel {
        if (this._columnDefinitions) return this._columnDefinitions;

        this.debug('Readed from localstorage');
        let json: string = this.localStorage.Get(this.userPerferencesKey);
        this._columnDefinitions = json ? JSON.parse(json) : null;

        return this._columnDefinitions;
    }
    private getOrCreateColumnReorderingDefinition(): ColumnReorderingDefinitionsModel {
        let definition = this.getColumnReorderingDefinition();
        
        if (!definition || this.definitionIsNotCompatibleAnymore(definition)) {
            return this.buildColumnReorderingDefinition();
        }

        return definition;
    }
    private buildColumnReorderingDefinition(): ColumnReorderingDefinitionsModel {
        let definition: ColumnReorderingDefinitionsModel = {
            key: this.userPerferencesKey,
            data: this.columns.map(c => {
                let item: ColumnReorderingDefinitionsItemModel = {
                    caption: c.caption,
                    originalIndex: c.index,
                    userIndex: c.index
                }
                return item;
            })
        }; 
        
        this._columnDefinitions = definition;
        this.localStorage.Set(this.userPerferencesKey, definition);
        this.debug('Rebuilded ColumnReorderingDefinition');

        return definition;
    }
    private definitionIsNotCompatibleAnymore(definition: ColumnReorderingDefinitionsModel): boolean {
        this.debug('Compatibility checking on:', definition);

        let hasDifferentNumberOfColumns = this.columns.length != definition.data.length;
        this.debug('hasDifferentNumberOfColumns', hasDifferentNumberOfColumns);

        if (hasDifferentNumberOfColumns) return true;

        let hasDifferencesByCaption = _.filter(definition.data, def => 
            this.columns[def.originalIndex].caption != def.caption
        ).length > 0;

        this.debug('hasDifferencesByCaption', hasDifferencesByCaption);
        return hasDifferencesByCaption;
    }
    private applyColumnReorderingDefinition(definition: ColumnReorderingDefinitionsModel): void {
        for (let i = 0; i < this.columns.length; i++) {
            let def = _.find(definition.data, x => x.caption == this.columns[i].caption);
            if (!def) continue;
            this.columns[i].index = def.userIndex;
            this.debug(this.columns[i].caption, this.columns[i].index);
        }

        this.columns = _.orderBy(this.columns, x => x.index);
    }
    private updateColumnReorderingDefinition(): void {
        if (!this.userPerferencesKey) return;

        let definition = this.getColumnReorderingDefinition();
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].index = i;
            let def = definition.data.find(x => x.caption == this.columns[i].caption);
            if (!def) continue;
            def.userIndex = i;
        }

        this._columnDefinitions = definition;
        this.localStorage.Set(this.userPerferencesKey, definition);
    }
    private getColumnReorderingDefinitionFrom(column: DataGridColumnModel): ColumnReorderingDefinitionsItemModel {
        if (!this.userPerferencesKey) return undefined;
        let definition = this.getColumnReorderingDefinition();
        if (!definition) return undefined;
        let def = definition.data.find(x => x.caption == column.caption);
        if (!def) return undefined;
        return def;
    }

    private debug(message: any, ...params: any[]): void {
        if (!this.debugMode) return;
        console.log(message, ...params);
    }
}
