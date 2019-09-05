import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCurrencyComponent,
    multi: true
  }]
})
export class InputCurrencyComponent extends ElementBase<string> implements OnInit {
  @Input() showInputGroup?: boolean = true;
  @Input() placeholder: string = '';
  @Input() precision: number = 2;
  @ViewChild(NgModel, {static: true}) model: NgModel;
  
  currencyCode: string;

  public identifier = `input-currency-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject(INPUT_FORMS_CONFIG) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
    this.currencyCode = this.config.currency.currencyCode;
  }

  ngOnInit(): void {}
}
