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

export class DataGridComponent extends ValueAccessorBase<Array<any>> implements OnInit, AfterViewInit {
    @ViewChild(NgModel) model: NgModel;
    @Input() columns: Array<DataGridColumnModel>;
    @Input() emptyResultsMessage?: string = this.config.emptyResultsMessage;
    @Input() striped?: boolean = this.config.styles.striped;
    @Input() bordered?: boolean = this.config.styles.bordered;
    @Input() hoverEffect?: boolean = this.config.styles.hoverEffect;
    @Input() responsive?: boolean = this.config.styles.responsive;
    @Input() initialColumnToSort?: number;
    @Input() initialSortDirection?: EnumSortDirection = EnumSortDirection.Ascending;

    constructor(
        @Inject(DATAGRID_CONFIG) public config: DataGridConfig
    ) {
        super();
    }

    ngOnInit() {
        console.log('ngOnInit grid', this.value);
        this.initializeColumns();
    }
    ngAfterViewInit(): void {   
        console.log('ngAfterViewInit grid', this.value);     
        this.initializeSorting();
    }

    OnValueChanged(): void {
        console.log('OnValueChanged', this.value);  
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

            if (!this.isUndefinedOrNull(this.initialColumnToSort) && this.initialColumnToSort == i) {
                this.columns[i].sort = new DataGridSortingModel();
                this.columns[i].sort.sorting = true;
                this.columns[i].sort.sortDirection = this.initialSortDirection;
            }
        }
    }
    private initializeSorting(): void {
        if (this.isUndefinedOrNull(this.value) || this.isUndefinedOrNull(this.initialColumnToSort)) {
            return;
        }
        if (this.initialColumnToSort > (this.columns.length - 1)) {
            console.error('Param [initialColumnToSort] greater than the number of columns.');
            return;
        }

        const columnToSort = _.findIndex(this.columns, x => x.sortable && x.sort && x.sort.sorting);

        if (columnToSort < 0) {
            return;
        }

        console.log(`sorting ${this.value} at index ${columnToSort} in direction ${this.initialSortDirection}`);

        this.value = _.orderBy(this.value, [columnToSort], [this.initialSortDirection]);
    }
    private isUndefinedOrNull(value: any): boolean {
        return value == undefined || value == null;
    }
}
