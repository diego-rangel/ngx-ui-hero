import * as _ from 'lodash';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ColumnFilterModel, EqualsOperator } from '../../models/column-filter.model';
import { DataGridColumnModel } from '../../models/data-grid-column.model';

@Component({
  selector: 'ui-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {
  @Output() onChange = new EventEmitter<DataGridColumnModel>();
  @Input() data: Array<any>;
  @Input() column: DataGridColumnModel;
  @Input() filterPlaceholder: string = 'Filter...';

  search = '';
  options: Array<any>;
  filteredOptions: Array<any>;

  constructor() { }

  ngOnInit() {
    this.initializeOptions();
  }

  onSearch() {
    if (!this.search || this.search.length == 0) {
      this.clearFilters();
      return;
    }

    this.filteredOptions = this.options.filter(x => x.toString().toUpperCase().indexOf(this.search.toUpperCase()) >= 0);
  }
  onClickOutside() {
    this.column.isFiltersOpenned = false;
  }

  select(item: any) {
    this.column.simpleFilter = new ColumnFilterModel(item, this.column, new EqualsOperator());
    this.onChange.emit(this.column);
    this.clearFilters();
  }
  removeSimpleFilter() {
    this.column.simpleFilter = null;
    this.onChange.emit(this.column);
  }

  private initializeOptions() {
    if (!this.data || this.data.length == 0) return;

    this.options = this.data.map((row: any, index: number) => {
      if (this.column.render)
        return this.column.render(row, this.renderPropertyValue(this.column.data, row), index);
      
      return this.renderPropertyValue(this.column.data, row);
    });

    this.options = _.uniqBy(this.options, x => x);
    this.clearFilters();
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
  private clearFilters() {
    this.search = '';
    this.filteredOptions = Object.assign([], this.options);
  }

}
