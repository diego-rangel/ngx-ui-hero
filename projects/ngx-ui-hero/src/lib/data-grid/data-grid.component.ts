import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter, ContentChild, TemplateRef, Optional } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { DATAGRID_CONFIG } from './data-grid-config.constants';
import { DataGridColumnModel, EnumAlignment, EnumSortDirection, DataGridSortingModel } from './data-grid-column.model';
import { DataGridConfig, EnumDataGridMode } from './data-grid-config';
import { ActionsColumnDirective } from './data-grid-templates.directive';

import * as _ from 'lodash';

@Component({
    selector: 'datagrid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DataGridComponent,
        multi: true
    }]
})

export class DataGridComponent implements OnInit, ControlValueAccessor, DataGridConfig {
    sortApplied: boolean = false;
    currentPage: number;
    gridData: Array<any>;

    @ViewChild(NgModel) model: NgModel;
    @Input() columns: Array<DataGridColumnModel>;
    @Input() emptyResultsMessage?: string = 'No results found at this moment.';
    @Input() infoMessage?: string = 'Showing records from {recordsFrom} to {recordsTo} of {totalRecords} records found.';
    @Input() striped?: boolean = true;
    @Input() bordered?: boolean = true;
    @Input() hoverEffect?: boolean = true;
    @Input() responsive?: boolean = true;
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
    @Input() firstText: string = 'First';
    @Input() previousText: string = 'Previous';
    @Input() nextText: string = 'Next';
    @Input() lastText: string = 'Last';
    @Output() OnPaginate = new EventEmitter<any>();
    @Output() OnSort = new EventEmitter<DataGridColumnModel>();
    @ContentChild(ActionsColumnDirective, {read: TemplateRef}) actionsColumnTemplate: ActionsColumnDirective;

    private innerValue: Array<any>;
    private changed = new Array<(value: Array<any>) => void>();
    private isTouched = new Array<() => void>();

    constructor(
        @Inject(DATAGRID_CONFIG) @Optional() defaultOptions: DataGridConfig
    ) {
        Object.assign(this, defaultOptions);
        Object.assign(this, defaultOptions.paging);
        Object.assign(this, defaultOptions.styles);
    }

    get value(): Array<any> {
        return this.innerValue;
    }
    set value(value: Array<any>) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    ngOnInit() {
        this.initializeColumns();
        this.renderData();
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
        let totalRecords: number = this.innerValue ? this.innerValue.length : 0;

        if (recordsTo > totalRecords) {
            recordsTo = recordsTo - (recordsTo - totalRecords);
        }

        return result
            .replace('{recordsFrom}', recordsFrom.toString())
            .replace('{recordsTo}', recordsTo.toString())
            .replace('{totalRecords}', totalRecords.toString());
    }

    private renderData(): void {
        setTimeout(() => {
            this.initializeGridData();
            this.initializePaging();
            this.initializeSorting();
        },0);
    }
    private initializeGridData(): void {
        this.gridData = Object.assign([], this.innerValue);
    }
    private initializeColumns(): void {
        if (!this.columns || this.columns.length == 0) {
            console.error('Param [columns] cannot be undefined or empty.');
            return;
        }

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
        if (this.isUndefinedOrNull(this.innerValue) || this.innerValue.length == 0 || this.mode == EnumDataGridMode.OnServer || this.isUndefinedOrNull(this.initialColumnToSort)) {
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

        if (this.innerValue && this.mode == EnumDataGridMode.OnClient) {
            this.totalItems = this.innerValue.length;
        }
    }
    private isUndefinedOrNull(value: any): boolean {
        return value == undefined || value == null;
    }
    private sortOnClient(column: DataGridColumnModel): void {
        this.innerValue = _.orderBy(this.innerValue, [column.data], [column.sort.sortDirection]);

        this.paginateOnClient(this.currentPage);
    }
    private paginateOnClient(page: number): void {
        const startItem = (page - 1) * this.itemsPerPage;
        const endItem = page * this.itemsPerPage;
        this.gridData = this.innerValue.slice(startItem, endItem);
    }
    
    touch() {
        this.isTouched.forEach(f => f());
    }
    writeValue(value: Array<any>) {
        this.innerValue = value;

        if (this.sortApplied) {
            this.renderData();
        }
    }
    registerOnChange(fn: any): void {
        this.changed.push(fn);
    }
    registerOnTouched(fn: any): void {
        this.isTouched.push(fn);
    }
}
