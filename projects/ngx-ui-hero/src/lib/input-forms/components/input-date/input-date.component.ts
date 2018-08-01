import { Component, Input, ViewChild, Optional, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { InputDateConfig } from './input-date-config';
import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';

import { arLocale, csLocale, daLocale, deLocale, enGbLocale, esLocale, 
  esDoLocale, esUsLocale, fiLocale, frLocale, hiLocale, huLocale, 
  idLocale, itLocale, jaLocale, koLocale, mnLocale, nlLocale, nlBeLocale, 
  plLocale, ptBrLocale, svLocale, ruLocale, roLocale, zhCnLocale, trLocale, 
  heLocale, thLocale, slLocale, glLocale } from 'ngx-bootstrap/locale';

const locales = [arLocale, csLocale, daLocale, deLocale, enGbLocale, esLocale, 
  esDoLocale, esUsLocale, fiLocale, frLocale, hiLocale, huLocale, 
  idLocale, itLocale, jaLocale, koLocale, mnLocale, nlLocale, nlBeLocale, 
  plLocale, ptBrLocale, svLocale, ruLocale, roLocale, zhCnLocale, trLocale, 
  heLocale, thLocale, slLocale, glLocale];

locales.forEach(locale => defineLocale(locale.abbr, locale)); 

let identifier = 0;

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputDateComponent,
    multi: true
  }]
})
export class InputDateComponent extends ElementBase<Date> implements OnInit, InputDateConfig {
  @Input() placeholder = '';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format?: string;
  @Input() placement?: string = 'bottom';
  @Input() theme?: string = 'theme-dark-blue';
  @Output() onChange = new EventEmitter<Date>();

  locale?: string = 'en-gb';
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: this.format,
    containerClass: this.theme
  };

  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-date-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private localeService: BsLocaleService
  ) {
    super(validators, asyncValidators, config);

    if (config.date) {
      Object.assign(this, config.date);
    }
  }

  ngOnInit() {
    this.localeService.use(this.locale);
  }

  onValueChange(value: any): void {
    this.onChange.emit(value);  
  }
}
