import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

let identifier = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCurrencyComponent,
    multi: true
  }]
})
export class InputCurrencyComponent extends ElementBase<string> {
  @ViewChild(NgModel) model: NgModel;
  currencyCode: string;

  public identifier = `input-currency-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
    this.currencyCode = this.config.currency.currencyCode;
  }
}
