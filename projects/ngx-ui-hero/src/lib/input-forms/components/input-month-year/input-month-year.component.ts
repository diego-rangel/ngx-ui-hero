import { Component, DoCheck, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  @Input() placeholder = 'Select...';
  @Input() language: string = 'en';
  @Input() format?: string = 'MMM/yyyy';
  @Input() showInputGroup?: boolean = true;
  @Input() inputGroupText?: string | SafeHtml;
  @ViewChild(NgModel) model: NgModel;

  languageDefinitions: InputMonthYearLanguage;
  showDropdown: boolean;
  internalModel: Date;
  selectedYear: number;
  displayMode: EnumDisplayMode = EnumDisplayMode.Month;

  public identifier = `input-month-year-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private domSanitizer: DomSanitizer,
  ) {
    super(validators, asyncValidators, config);
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
    } else {
      this.showDropdown = value;
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
  }

  private init(): void {
    this.initLanguageDefinitions();
    this.initInputGroup();
  }
  private initLanguageDefinitions(): void {
    this.languageDefinitions = INPUT_MONTH_YEAR_LANGUAGES.get(this.language);
  }
  private initInputGroup(): void {
    if (!this.inputGroupText) {
      this.inputGroupText = this.domSanitizer.bypassSecurityTrustHtml("<i class='fa fa-calendar' aria-hidden='true'></i>");
    }
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
}

export enum EnumDisplayMode {
  Month, Year 
}
