import { Component, EventEmitter, Inject, Input, IterableDiffers, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

declare var $: any;

let identifier = 0;

@Component({
  selector: 'input-dropdown-search',
  templateUrl: './input-dropdown-search.component.html',
  styleUrls: ['./input-dropdown-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputDropdownSearchComponent,
    multi: true
  }]
})
export class InputDropdownSearchComponent extends ElementBase<any> implements OnInit { 
  private _lastModelInitialized: any;
  private _differData: any;
  private _data: Array<any>;
  showDropdown: boolean;
  comboTouched: boolean;
  loading: boolean;
  modelInitialized: boolean;
  clickOutsideEnabled: boolean = true;
  search: string;
  selectedDisplayText: string;
  internalData: Array<any>;
  searchCounter: number = 0;
  selectedItemIndex: number = -1;
  
  @ViewChild(NgModel, {static: true}) model: NgModel;
  @Input() public placeholder = 'Select...';
  @Input() public searchPlaceholder = 'Search...';
  @Input() public emptyResultsMessage?: string = 'No results found at this moment.';
  @Input() public displayTextProperty: string;
  @Input() public valueProperty: string;
  @Input() public lazyLoadedData: boolean;
  @Input() public minCharsToSearch: number = 3;
  @Output() public onChange = new EventEmitter<any>();
  @Output() public onSearch = new EventEmitter<string>();

  get data(): Array<any> {
    return this._data;
  }    
  @Input('data')
  set data(value: Array<any>) {
    this._data = value;
    this.Init();
  }
  
  public identifier = `input-dropdown-search-${identifier++}`;  
 
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

    if (this.value != null && this.value != undefined) {
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
      
      if (this.lazyLoadedData) {
        this.search = '';
        this.internalData = [];
      } else {
        this.clearSearch(true);
      }      
    } else {
      this.clickOutsideEnabled = true;
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
    if (this.lazyLoadedData) {
      this.onSearch.emit(this.search);
      this.searchCounter += 1;
      return;
    }

    if (!this.search || this.search.length < this.minCharsToSearch) {
      this.clearSearchResults();
      return;
    }

    this.filterData();
  }
  ClearSelection(e?: any): void {
    this.value = null;
    this.selectedDisplayText = null;
    this.comboTouched = true;
    this.showDropdown = false;
    this.onChange.emit(this.value);

    if (e) e.stopPropagation();
  }
  SetLoading(value: boolean): void {
    this.loading = value;
  }
  OnArrowsPressed(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.Select(this.internalData[this.selectedItemIndex]);
    } else if (event.keyCode >= 37 && event.keyCode <= 40) {
      this.handleArrows(event.keyCode);
    }
  }
  OnComboPressed(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.ToggleDropDown(null);
      event.preventDefault();
    }
  }

  private handleOptionsScrollerDown(): void {
    var scroll = 0;
    var scrollPositionStart = $(`#${this.identifier} .result-list`).scrollTop();
    var scrollPositionEnd = scrollPositionStart + (38 * 6);
    var currentPosition = this.selectedItemIndex * 38;

    if (currentPosition >= scrollPositionStart && currentPosition < scrollPositionEnd) {
      scroll = scrollPositionStart;
    } else {
      scroll = (this.selectedItemIndex - 6) * 38;
    }
    
    $(`#${this.identifier} .result-list`).scrollTop(scroll);
  }
  private handleOptionsScrollerUp(): void {
    var scroll = 0;
    var scrollPositionStart = $(`#${this.identifier} .result-list`).scrollTop();
    var scrollPositionEnd = scrollPositionStart + (38 * 6);
    var currentPosition = this.selectedItemIndex * 38;

    if (currentPosition > scrollPositionStart && currentPosition <= scrollPositionEnd) {
      scroll = scrollPositionStart;
    } else {
      scroll = (this.selectedItemIndex - 1) * 38;
    }
    
    $(`#${this.identifier} .result-list`).scrollTop(scroll);
  }
  private handleArrows(keyCode: number): void {
    switch (keyCode) {
      case 38: //ArrouUp
        if (this.selectedItemIndex > 0) {
          this.selectedItemIndex -= 1;
        }

        this.handleOptionsScrollerUp();
        break;
      case 40: //ArrouDown
        if (this.selectedItemIndex < (this.internalData.length - 1)) {
          this.selectedItemIndex += 1;
        }   
        
        this.handleOptionsScrollerDown();   
        break;
    }
  }
  private setSelectedItemByTheCurrentModelValue(): void {
    if (this.value == null || this.value == undefined) return;

    let row = this.data.find(x => this.value == this.renderPropertyValue(this.valueProperty, x));
    if (row) {
      this.selectedDisplayText = this.renderPropertyValue(this.displayTextProperty, row);
    }
  }
  private filterData(): void {
    this.internalData = this.data.filter(x => {
      let value = this.renderPropertyValue(this.displayTextProperty, x);

      if (value && value.toString().toUpperCase().indexOf(this.search.toUpperCase()) >= 0) {
        return true;
      }

      return false;
    });
  }
  private clearSearch(clearSearchInput?: boolean): void {
    if (clearSearchInput) {
      this.search = '';
    }
    
    this.clearSearchResults();
  }
  private clearSearchResults(): void {
    this.selectedItemIndex = -1;
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
