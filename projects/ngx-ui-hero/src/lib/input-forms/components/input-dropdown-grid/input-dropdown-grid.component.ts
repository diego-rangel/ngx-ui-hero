import { Component, EventEmitter, Inject, Input, IterableDiffers, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { DataGridColumnModel } from '../../../data-grid/models/data-grid-column.model';
import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-dropdown-grid',
  templateUrl: './input-dropdown-grid.component.html',
  styleUrls: ['./input-dropdown-grid.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputDropdownGridComponent,
    multi: true
  }]
})
export class InputDropdownGridComponent extends ElementBase<any> implements OnInit { 
  private _lastModelInitialized: any;
  private _differData: any;
  private _data: Array<any>;
  showDropdown: boolean;
  comboTouched: boolean;
  modelInitialized: boolean;
  clickOutsideEnabled: boolean = true;
  search: string;
  selectedDisplayText: string;
  internalData: Array<any>;
  
  @ViewChild(NgModel, {static: true}) model: NgModel;
  @Input() public placeholder = 'Select...';
  @Input() public searchPlaceholder = 'Search...';
  @Input() public displayTextProperty: string;
  @Input() public valueProperty: string;
  @Input() public columns: Array<DataGridColumnModel>; 
  @Input() itemsPerPage?: number = 5;
  @Output() public onChange = new EventEmitter<any>();

  get data(): Array<any> {
    return this._data;
  }    
  @Input('data')
  set data(value: Array<any>) {
    this._data = value;
    this.Init();
  }
  
  public identifier = `input-dropdown-grid-${identifier++}`;  
 
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private iterableDiffers: IterableDiffers,
  ) {
    super(validators, asyncValidators, config);

    if (config.dropDown) {
      Object.assign(this, config.dropDown);
    }

    this._differData = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this.Init();
  }
  ngDoCheck(): void {
    let changesInData = this._differData.diff(this._data);

    if (changesInData || !this.modelInitialized || this.value != this._lastModelInitialized) {
      this.Init();
    }
  }

  Init(): void {
    this.clearSearch();

    if (!this.internalData || this.internalData.length == 0) {
      return;
    }

    if (this.value) {
      this.setSelectedItemByTheCurrentModelValue();
      this._lastModelInitialized = this.value;
    } else {
      this.selectedDisplayText = '';
      this._lastModelInitialized = undefined;
    }
    
    this.modelInitialized = true;
  }

  ToggleDropDown(event: MouseEvent, value?: boolean): void {
    if (this.clickOutsideEnabled) {
      if ((value == false && !this.showDropdown) || (value == undefined && this.disabled)) return;
    
      if (value == undefined) {
        if (this.showDropdown) {
          this.setComboTouched();
        }
  
        this.showDropdown = !this.showDropdown;      
      } else {
        if (!value && this.showDropdown) {
          this.setComboTouched();
        }
        
        this.showDropdown = value;
      }
      
      this.clearSearch();
    } else {
      this.clickOutsideEnabled = true;
    }

    if (event) {
      event.stopImmediatePropagation();
    }
  }
  Select(row: any): void {
    if (this.disabled) {
      this.ToggleDropDown(null, false);
      return;
    }

    this.value = this.renderPropertyValue(this.valueProperty, row);
    this.onChange.emit(this.value);    
    this.ToggleDropDown(null, false);
  }
  OnSearch(): void {
    if (!this.search || this.search.length < 3) {
      this.clearSearchResults();
      return;
    }

    this.filterData();
  }
  OnPaginate(): void {
    this.clickOutsideEnabled = false;
  }
  ClearSelection(e?: any): void {
    this.value = null;
    this.selectedDisplayText = null;
    this.comboTouched = true;
    this.showDropdown = false;
    this.onChange.emit(this.value);

    if (e) e.stopPropagation();
  }
  OnComboPressed(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.ToggleDropDown(null);
      event.preventDefault();
    }
  }

  private setSelectedItemByTheCurrentModelValue(): void {
    if (!this.value) return;

    let row = this.data.find(x => this.value == this.renderPropertyValue(this.valueProperty, x));
    if (row) {
      this.selectedDisplayText = this.renderPropertyValue(this.displayTextProperty, row);
    }
  }
  private filterData(): void {
    this.internalData = this.data.filter(x => {
      
      for (let i = 0; i < this.columns.length; i++) {
        let columnData = '';
        let value = '';

        if (this.columns[i].data) {
          columnData = this.renderPropertyValue(this.columns[i].data, x);
        }

        if (this.columns[i].render != undefined) {
          value = this.columns[i].render(x, columnData, i);
        } else {
          value = columnData;
        }

        if (value && value.toString().toUpperCase().indexOf(this.search.toUpperCase()) >= 0) {
          return true;
        }
      }

      return false;
    });
  }
  private clearSearch(): void {
    this.search = '';
    this.clearSearchResults();
  }
  private clearSearchResults(): void {
    this.internalData = Object.assign([], this.data);
  }
  private setComboTouched(): void {
    this.comboTouched = true;
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
