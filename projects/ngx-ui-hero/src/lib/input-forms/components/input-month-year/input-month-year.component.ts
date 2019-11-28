import { AfterViewInit, Component, DoCheck, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { INPUT_MONTH_YEAR_LANGUAGES } from './input-month-year.constants';
import { InputMonthYearLanguage } from './input-month-year.language';

let identifier = 0;

@Component({
  selector: 'input-month-year',
  templateUrl: './input-month-year.component.html',
  styleUrls: ['./input-month-year.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputMonthYearComponent,
    multi: true
  }]
})
export class InputMonthYearComponent extends ElementBase<Date> implements OnInit, DoCheck {
  @Input() placeholder?: string = 'Select...';
  @Input() language?: string = 'en';
  @Input() format?: string = 'MMM/yyyy';
  @ViewChild(NgModel, {static: true}) model: NgModel;
  @Output() onChange = new EventEmitter<Date>();

  languageDefinitions: InputMonthYearLanguage;
  comboTouched: boolean;
  showDropdown: boolean;
  internalModel: Date;
  selectedYear: number;
  displayMode: EnumDisplayMode = EnumDisplayMode.Month;

  public identifier = `input-month-year-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit() {
    if (this.config.monthYear) {
      Object.assign(this, this.config.monthYear);
    }

    this.init();
  }
  ngDoCheck(): void {
    this.handleInitialValue();
  }

  ToggleDropDown(event: MouseEvent, value?: boolean): void {
    if ((value == false && !this.showDropdown) || (value == undefined && this.disabled)) return;

    this.displayMode = EnumDisplayMode.Month;
    this.handleSelectedYear();

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
  }

  IncrementSelectedYear(): void {
    if (this.disabled) return;
    this.selectedYear++;
  }
  DecrementSelectedYear(): void {
    if (this.disabled) return;
    this.selectedYear--;
  }

  SelectMonth(month: number): void {
    if (this.disabled) {
      this.showDropdown = false;
      return;
    }
    
    let newDate = new Date(this.selectedYear, month, 1, 0, 0, 0, 0);
    this.value = newDate;
    this.showDropdown = false;
    this.setComboTouched();

    this.onChange.emit(this.value);
  }
  Clear(event: any): void {
    this.value = null;
    this.comboTouched = true;
    this.showDropdown = false;
    this.onChange.emit(this.value);

    event.stopPropagation();
  }
  OnComboPressed(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.ToggleDropDown(null);
      event.preventDefault();
    }
  }

  private init(): void {
    this.initLanguageDefinitions();
  }
  private initLanguageDefinitions(): void {
    this.languageDefinitions = INPUT_MONTH_YEAR_LANGUAGES.get(this.language);
  }

  private handleSelectedYear(): void {
    if (this.value) {
      this.selectedYear = this.value.getFullYear();
    } else {
      this.selectedYear = new Date().getFullYear();
    }
  }
  private handleInitialValue(): void {
    if (this.value && (typeof this.value == "string" || this.value instanceof String)) {
      let data = new Date(this.value);
      data.setHours(0);
      data.setMinutes(0);
      data.setSeconds(0);
      data.setMilliseconds(0);

      this.writeValue(data);
    }
  }

  private setComboTouched(): void {
    this.comboTouched = true;
  }
}

export enum EnumDisplayMode {
  Month, Year 
}
