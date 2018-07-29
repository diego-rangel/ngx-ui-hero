import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DATAGRID_CONFIG } from './data-grid-config.constants';
import { DataGridColumnModel, EnumAlignment, EnumSortDirection, DataGridSortingModel } from './data-grid-column.model';
import { DataGridConfig } from './data-grid-config';
import { ValueAccessorBase } from '../input-forms/base/value-accessor-base';

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

export class DataGridComponent extends ValueAccessorBase<Array<any>> implements OnInit {
    @ViewChild(NgModel) model: NgModel;
    @Input() columns: Array<DataGridColumnModel>;
    @Input() emptyResultsMessage?: string = this.config.emptyResultsMessage;
    @Input() striped?: boolean = this.config.styles.striped;
    @Input() bordered?: boolean = this.config.styles.bordered;
    @Input() hoverEffect?: boolean = this.config.styles.hoverEffect;
    @Input() responsive?: boolean = this.config.styles.responsive;
    @Input() initialColumnToSort?: number;
    @Input() initialSortDirection?: EnumSortDirection = EnumSortDirection.Ascending;

    sortApplied: boolean = false;

    constructor(
        @Inject(DATAGRID_CONFIG) public config: DataGridConfig
    ) {
        super();
    }

    ngOnInit() {
        this.initializeColumns();

        setTimeout(() => {
            this.initializeSorting();
        },0);
    }

    ToogleSorting(column: DataGridColumnModel): void {
        if (!column.sortable || !column.sort) {
            return;
        }

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

        this.sort(column);
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
                dataType: String,             
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
        if (this.isUndefinedOrNull(this.value) || this.isUndefinedOrNull(this.initialColumnToSort)) {
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
        
        this.sort(columnToSort);
        this.sortApplied = true;
    }
    private isUndefinedOrNull(value: any): boolean {
        return value == undefined || value == null;
    }
    private sort(column: DataGridColumnModel): void {
        this.value = _.orderBy(this.value, [column.data], [column.sort.sortDirection]);
    }    
}
