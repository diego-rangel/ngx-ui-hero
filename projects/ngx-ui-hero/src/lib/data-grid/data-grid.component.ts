import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DATAGRID_CONFIG } from './data-grid-config.constants';
import { DataGridColumnModel, EnumAlignment, EnumSortDirection, DataGridSortingModel } from './data-grid-column.model';
import { DataGridConfig } from './data-grid-config';
import { ValueAccessorBase } from '../input-forms/base/value-accessor-base';

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

    constructor(
        @Inject(DATAGRID_CONFIG) public config: DataGridConfig
    ) {
        super();
    }

    ngOnInit() {
        this.initializeColumns();
    }

    private initializeColumns(): void {
        if (this.columns) {
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

                if (this.initialColumnToSort != undefined && this.initialColumnToSort != null && this.initialColumnToSort == i) {
                    this.columns[i].sort = new DataGridSortingModel();
                    this.columns[i].sort.sorting = true;
                    this.columns[i].sort.sortDirection = this.initialSortDirection;
                }
            }
        }
    }
}
