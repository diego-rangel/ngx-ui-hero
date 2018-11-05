import { Component, DoCheck, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
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
  @Input() placeholder: string = 'Select...';
  @Input() language: string = 'en';
  @Input() format?: string = 'MMM/yyyy';
  @ViewChild(NgModel) model: NgModel;
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

    if (config.monthYear) {
      Object.assign(this, config.monthYear);
    }
  }

  ngOnInit() {
    this.init();
  }
  ngDoCheck(): void {
    this.handleInitialValue();
  }

  ToggleDropDown(value?: boolean): void {
    if (this.disabled) return;

    this.displayMode = EnumDisplayMode.Month;
    this.handleSelectedYear();

    if (value == undefined) {
      this.showDropdown = !this.showDropdown;
      this.setComboTouched();
    } else {
      this.showDropdown = value;
      this.setComboTouched();
    }
  }

  IncrementSelectedYear(): void {
    this.selectedYear++;
  }
  DecrementSelectedYear(): void {
    this.selectedYear--;
  }

  SelectMonth(month: number): void {
    let newDate = new Date(this.selectedYear, month, 1, 0, 0, 0, 0);
    this.value = newDate;
    this.showDropdown = false;

    this.onChange.emit(this.value);
  }
  Clear(event: any): void {
    this.value = null;
    this.comboTouched = true;
    this.showDropdown = false;
    this.onChange.emit(this.value);

    event.stopPropagation();
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
    if (!this.showDropdown) {
      this.comboTouched = true;
    }
  }
}

export enum EnumDisplayMode {
  Month, Year 
}
